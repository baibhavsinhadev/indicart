import { BoxIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Orders = () => {

    const { currency, sellerOrders } = useAppContext();

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
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders;