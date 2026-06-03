import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import stripe from 'stripe';

// Place Order COD : POST /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { items, address } = req.body;

        if (!address) {
            return res.status(401).json({
                success: false,
                message: "Address is required"
            });
        };

        if (!items || items.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Your cart is empty"
            });
        };

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        res.status(200).json({
            success: true,
            message: "Order Placed Successfully"
        });
    } catch (error) {
        logger.error({ error }, "Place Order COD Error");

        res.status(500).json({
            success: false,
            message: "Failed to place order",
        });
    };
};

// Place Order Stripe : POST /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { items, address } = req.body;
        const { origin } = req.headers;

        if (!address) {
            return res.status(401).json({
                success: false,
                message: "Address is required"
            });
        };

        if (!items || items.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Your cart is empty"
            });
        };

        let productData = [];

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);

            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });

            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02)

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        // Stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // Create Line Items For Stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity
            };
        });

        // Create Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        });

        res.status(200).json({
            success: true,
            url: session.url
        });
    } catch (error) {
        logger.error({ error }, "Place Order COD Error");

        res.status(500).json({
            success: false,
            message: "Failed to place order",
        });
    };
};

// Stripe Webhooks to Verify Payments Action : POST /stripe
export const stripeWebhooks = async (request, response) => {
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        logger.error({ error }, "Stripe Payment Verify Error");
        response.status(400).send(`Webhook Error: ${error.message}`);
    };

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            });

            const { orderId, userId } = session.data[0].metadata;

            // Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true });

            // Clear User Cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            break;
        };

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            });

            const { orderId, userId } = session.data[0].metadata;

            // Delete Order
            await Order.findByIdAndUpdate(orderId, { isPaid: true });
            break;
        };

        default:
            logger.error({ error }, `Unhandled event type ${event.type}`);
            break;
    };

    response.status(200).json({ received: true });
};

// Get Orders by UserID : GET /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        logger.error({ error }, "Get User Orders Error");

        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    };
};

// Get All Orders : GET /api/order/seller
export const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address");

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        logger.error({ error }, "Get Seller Orders Error");

        res.status(500).json({
            success: false,
            message: "Failed to fetch seller orders",
        });
    }
};

// Update Order Status : POST /api/order/update
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const validStatuses = ["Order Placed", "Out For Delivery", "Delivered"];

        // check valid status
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const currentStatus = order.status || "Order Placed";

        // Prevent backward movement
        const statusFlow = {
            "Order Placed": 1,
            "Out For Delivery": 2,
            "Delivered": 3
        };

        if (statusFlow[status] < statusFlow[currentStatus]) {
            return res.status(400).json({
                success: false,
                message: `Cannot change status from ${currentStatus} to ${status}`
            });
        }

        // Update
        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated",
            order
        });

    } catch (error) {
        logger.error({ error }, "Update Order Status Error");

        res.status(500).json({
            success: false,
            message: "Failed to update order status",
        });
    }
};