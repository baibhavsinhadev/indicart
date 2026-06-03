import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/axios";

const SellerLogin = () => {

    const { isSeller, setIsSeller, navigate } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        try {
            event.preventDefault();

            const { data } = await api.post('/seller/login', { email, password });
            if (data.success) {
                setIsSeller(true);
                navigate("/seller");
                toast.success(data.message);
            } else {
                toast.error(data.message)
            };
        } catch (error) {
            toast.error("Seller Login Error")
        };
    };

    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }
    }, [isSeller]);

    return !isSeller && (
        <form onSubmit={handleLogin} className="min-h-screen flex items-center text-sm text-gray-600">
            <div className="flex flex-col gap-4 m-auto items-start p-8 py-8 w-80 sm:w-88 rounded-lg shadow-xl border border-gray-200">
                <div className="flex flex-col">
                    <p className="text-2xl font-medium"><span className="text-primary">IndiCart Seller</span> Login</p>
                </div>

                <div className="relative w-full">
                    <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className="peer w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-primary" />

                    <label htmlFor="email" className="absolute left-2 text-gray-500 duration-300 transform origin-left z-10 top-1/2 -translate-y-1/2 scale-100 bg-white peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 px-2 flex gap-1 items-center">
                        <MailIcon size={14} />
                        Enter your email
                    </label>
                </div>

                <div className="relative w-full">
                    <input required type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className="peer w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-primary" />

                    <label htmlFor="password" className="absolute left-2 text-gray-500 duration-300 transform origin-left z-10 top-1/2 -translate-y-1/2 scale-100 bg-white peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 px-2 flex gap-1 items-center">
                        <LockIcon size={14} />
                        Enter your password
                    </label>
                </div>

                <button type="submit" className="bg-primary hover:bg-primary-dull hover:scale-105 active:scale-95 transition-all text-white w-full py-2 rounded-md">
                    Login
                </button>
            </div>
        </form>
    );
};

export default SellerLogin;