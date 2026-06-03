import { LayoutDashboardIcon, ListIcon, ListOrdered, PlusIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import api from "../../api/axios";
import { toast } from "react-toastify";

const SellerLayout = () => {

    const { setIsSeller, navigate } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await api.post("/seller/logout");
            if (data.success) {
                setIsSeller(false);
                toast.success(data.message);
                navigate("/")
            } else {
                toast.error(data.message);
            };
        } catch (error) {
            toast.error("Seller Logout Error");
        };
    };

    const sidebarLinks = [
        { name: "Dashboard", path: "/seller", icon: LayoutDashboardIcon },
        { name: "Add Product", path: "/seller/add-products", icon: PlusIcon },
        { name: "Product List", path: "/seller/product-list", icon: ListIcon },
        { name: "Orders", path: "/seller/orders", icon: ListOrdered },
    ];

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shrink-0">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="h-8 md:h-9 object-contain hover:scale-105 transition-transform duration-200 active:scale-95" loading="lazy" />
                </Link>

                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border border-gray-300 rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="md:w-64 w-16 border-r border-gray-300 flex flex-col pt-2 shrink-0">
                    {sidebarLinks.map((sidebarLink, index) => {
                        const Icon = sidebarLink.icon;

                        return (
                            <NavLink end to={sidebarLink.path} key={sidebarLink.name} className={({ isActive }) => `flex items-center gap-3 px-4 py-4 transition-all border-r-4 duration-200 group ${isActive ? "bg-indigo-50 text-indigo-600 border-indigo-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-white hover:border-gray-500"}`}>
                                <Icon size={20} />

                                <p className="hidden md:block text-sm font-medium tracking-wide">{sidebarLink.name}</p>
                            </NavLink>
                        );
                    })}
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerLayout;