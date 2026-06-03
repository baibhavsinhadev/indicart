import { useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuIcon, SearchIcon, ShoppingBasket, XIcon, User2Icon } from "lucide-react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import api from "../api/axios";

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const { user, setUser, setShowUserLogin, navigate, search, setSearch, getCartCount, setCartItems } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await api.post("/user/logout");
            if (data.success) {
                setUser(null);
                navigate('/')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            };
        } catch (error) {
            toast.error(error.message)
        }
    };

    const toggleMenu = useCallback(() => {
        setOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setOpen(false);
    }, []);

    const handleSearch = () => {
        navigate("/products");
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <NavLink to="/">
                <img src={assets.logo} alt="logo" className="h-8 md:h-9 object-contain hover:scale-105 transition-transform duration-200 active:scale-95" loading="lazy" />
            </NavLink>

            <div className="hidden sm:flex items-center gap-10 text-[15px] font-medium text-gray-700">
                <NavLink className="hover:text-primary transition" to="/">Home</NavLink>
                <NavLink className="hover:text-primary transition" to="/products">Products</NavLink>
                <NavLink className="hover:text-primary transition" to="/">Contact</NavLink>

                <NavLink className="border border-gray-500 px-6 py-1 rounded-full hover:bg-gray-100 transition" to="/seller">Seller</NavLink>

                <div className="flex items-center gap-6 ml-4">
                    <div className="hidden lg:flex items-center border border-gray-200 px-4 rounded-full text-sm bg-gray-50 focus-within:ring-2 focus-within:ring-primary/40 transition">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} type="text" placeholder="Search products" className="py-1.5 bg-transparent outline-none placeholder-gray-400 w-60" />

                        <SearchIcon onClick={handleSearch} size={18} className="text-gray-400 cursor-pointer" />
                    </div>

                    <Link to={getCartCount() > 0 ? "/cart" : "/products"} onClick={() => {
                        if (getCartCount() === 0) {
                            toast.warn("Your cart is empty!");
                        }
                    }} className="relative cursor-pointer group">
                        <ShoppingBasket className={`${getCartCount() > 0 ? "w-5" : ""} text-gray-600 group-hover:text-primary transition`} />

                        {getCartCount() > 0 && (
                            <span className="absolute -top-2 -right-2 text-[10px] text-white bg-primary w-4 h-4 flex items-center justify-center rounded-full shadow">
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative">
                            <div onClick={() => setShowProfileMenu(prev => !prev)} className="p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
                                <User2Icon size={22} className="text-gray-700" />
                            </div>


                            <ul className={`absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-200 origin-top-right z-50 ${showProfileMenu ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
                                <li onClick={() => { navigate("/my-orders"); setShowProfileMenu(false); }} className="px-4 py-2.5 hover:bg-gray-50 rounded-t-xl transition cursor-pointer">
                                    My Orders
                                </li>

                                <li onClick={() => { logout(); setShowProfileMenu(false); }} className="px-4 py-2.5 border-t border-gray-200 hover:bg-red-50 text-red-500 rounded-b-xl transition cursor-pointer">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-7 py-1.5 bg-primary hover:bg-primary-dull text-white rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
                            Login
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-2 items-center sm:hidden ">
                <Link to={getCartCount() > 0 ? "/cart" : "/products"} onClick={() => {
                    if (getCartCount() === 0) {
                        toast.warn("Your cart is empty!");
                    }
                }} className="relative cursor-pointer group">
                    <ShoppingBasket className={`${getCartCount() > 0 ? "w-5" : ""} text-gray-600 group-hover:text-primary transition`} />

                    {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 text-[10px] text-white bg-primary w-4 h-4 flex items-center justify-center rounded-full shadow">
                            {getCartCount()}
                        </span>
                    )}
                </Link>

                <button onClick={toggleMenu} aria-label="menu" className="cursor-pointer p-1 rounded-md hover:bg-gray-100 transition">
                    {open ? <XIcon size={24} /> : <MenuIcon size={24} />}
                </button>
            </div>

            <div className={`absolute top-full left-0 w-full border-t border-gray-300 bg-white shadow-lg py-5 flex flex-col items-start gap-4 px-6 text-sm md:hidden transition-all duration-300 ease-in-out rounded-b-2xl ${open ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"}`}>
                <NavLink onClick={closeMenu} className="hover:text-primary transition" to="/">Home</NavLink>
                <NavLink onClick={closeMenu} className="hover:text-primary transition" to="/products">All Product</NavLink>

                {user && (
                    <NavLink onClick={closeMenu} className="hover:text-primary transition" to="/my-orders">
                        My Orders
                    </NavLink>
                )}

                <NavLink onClick={closeMenu} className="hover:text-primary transition" to="/">Contact</NavLink>

                <button onClick={() => {
                    closeMenu();
                    user ? logout() : setShowUserLogin(true);
                }} className="mt-2 cursor-pointer px-7 py-1.5 bg-primary hover:bg-primary-dull text-white rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                    {user ? "Logout" : "Login"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;