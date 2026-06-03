import { dummyOrders } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Package, ShoppingCart, DollarSignIcon, Clock, BoxIcon, } from "lucide-react";

const SellerDashboard = () => {

    const { products, currency, sellerOrders } = useAppContext();

    const totalProducts = products.length;
    const totalOrders = sellerOrders.length;
    const totalRevenue = sellerOrders.reduce((acc, order) => acc + order.amount, 0);
    const pendingOrders = sellerOrders.filter(order => order.status !== "Delivered").length;

    const statsCard = [
        {
            title: "Products",
            value: totalProducts,
            icon: Package,
            color: "indigo"
        },
        {
            title: "Orders",
            value: totalOrders,
            icon: ShoppingCart,
            color: "green"
        },
        {
            title: "Revenue",
            value: `${currency}${totalRevenue}`,
            icon: DollarSignIcon,
            color: "yellow"
        },
        {
            title: "Pending",
            value: pendingOrders,
            icon: Clock,
            color: "red"
        }
    ];

    return (
        <div className="p-6 space-y-6 max-w-237.5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {statsCard.map((stats, index) => {
                    const Icon = stats.icon;

                    return (
                        <div key={index} className="bg-white p-4 sm:p-5 border border-gray-300 flex items-center justify-between transition rounded">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">{stats.title}</p>
                                <h2 className="text-lg sm:text-2xl font-semibold mt-1">{stats.value}</h2>
                            </div>

                            <div className={`p-2 sm:p-3 rounded bg-${stats.color}-100`}>
                                <Icon className={`w-4 h-4 sm:w-6 sm:h-6 text-${stats.color}-600`} />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="bg-white rounded p-5 border border-gray-300">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

                <div className="space-y-4">
                    {sellerOrders.map((order) => (
                        <div key={order._id} className="flex rounded flex-col md:flex-row md:items-center gap-5 justify-between p-5 max-w-4xl border border-gray-300 bg-white text-gray-800">
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
            </div>
        </div>
    );
};

export default SellerDashboard;