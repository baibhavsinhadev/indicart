import User from "../models/User.js";
import logger from "../config/logger.js";

// Update User Cart Data : POST /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        };

        if (!cartItems || typeof cartItems !== "object") {
            return res.status(400).json({
                success: false,
                message: "Invalid cart data",
            });
        };

        for (const itemId in cartItems) {
            if (cartItems[itemId] <= 0) {
                delete cartItems[itemId];
            };
        };

        await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Cart Updated",
        });
    } catch (error) {
        logger.error({ error }, "Update Cart Error");

        res.status(500).json({
            success: false,
            message: "Failed to update cart",
        });
    };
};