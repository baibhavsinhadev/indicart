import { BoxIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Orders = () => {

    const { currency, sellerOrders } = useAppContext();
    const [orderStatus, setOrderStatus] = useState({});

    const handleStatusChange = async (orderId, value) => {
        try {
            setOrderStatus((prev) => ({
                ...prev,
                [orderId]: value
            }));

            const { data } = await api.post("/order/update", { orderId, status: value });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);

            setOrderStatus((prev) => ({
                ...prev,
                [orderId]: sellerOrders.find(o => o._id === orderId)?.status || "Order Placed"
            }));
        }
    };

    return (
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {sellerOrders.map((order, index) => (
                <div key={index} className="flex rounded flex-col md:flex-row md:items-center gap-5 justify-between p-5 max-w-4xl border border-gray-300 bg-white text-gray-800">
                    <div className="flex gap-5 max-w-80">
                        <div className="p-2 bg-primary/10 rounded">
                            <BoxIcon size={36} className="text-primary" />
                        </div>

                        <>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <p className="font-medium">
                                        {item.product.name}
                                        <span className="text-primary"> x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </>
                    </div>

                    <div className="text-sm md:text-base text-black/60">
                        <p className='text-black/80! font-medium'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}</p>
                        <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                        <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm md:text-base text-black/60">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>

                        <select value={orderStatus[order._id] || order.status || "Order Placed"} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="mt-2 border border-gray-300 px-2 py-1 text-black">
                            <option>Order Placed</option>
                            <option>Out For Delivery</option>
                            <option>Delivered</option>
                        </select>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Orders;