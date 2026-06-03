import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { LockIcon, MailIcon, User2Icon, XIcon } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

const LoginForm = () => {

    const { setShowUserLogin, navigate, setUser } = useAppContext();

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const { data } = await api.post(`/user/${state === "login" ? "login" : "register"}`, { name, email, password });
            if (data.success) {
                toast.success(data.message);
                navigate("/");
                setName("");
                setEmail("");
                setPassword("");
                setUser(data.user);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        }

        setShowUserLogin(false);
    };

    return (
        <div onClick={() => setShowUserLogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-100 backdrop-blur-md flex items-center text-sm text-gray-600 bg-black/50 inset-0">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-8 w-80 sm:w-88 rounded-lg shadow-xl border border-gray-200 bg-white">
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col">
                        <p className="text-xl text-primary! font-medium">IndiCart</p>
                        <span className="text-xs">{state === 'login' ? "User Login" : "User SignUp"}</span>
                    </div>

                    <XIcon onClick={() => setShowUserLogin(false)} size={24} className="text-gray-500 hover:scale-105 active:scale-95 cursor-pointer" />
                </div>

                {state !== "login" && (
                    <div className="relative w-full">
                        <input required type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder=" " className="peer w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-primary" />

                        <label htmlFor="name" className="absolute left-2 text-gray-500 duration-300 transform origin-left z-10 top-1/2 -translate-y-1/2 scale-100 bg-white peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 px-2 flex gap-1 items-center">
                            <User2Icon size={14} />
                            Enter your name
                        </label>
                    </div>
                )}

                <div className="relative w-full">
                    <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className="peer w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-primary" />

                    <label htmlFor="email" className="absolute left-2 text-gray-500 duration-300 transform origin-left z-10 top-1/2 -translate-y-1/2 scale-100 bg-white peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 px-2 flex gap-1 items-center">
                        <MailIcon size={14} />
                        Enter your email
                    </label>
                </div>

                <div className="relative w-full">
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className="peer w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-primary" />

                    <label htmlFor="password" className="absolute left-2 text-gray-500 duration-300 transform origin-left z-10 top-1/2 -translate-y-1/2 scale-100 bg-white peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 px-2 flex gap-1 items-center">
                        <LockIcon size={14} />
                        Enter your password
                    </label>
                </div>

                <div className="w-full text-center text-sm text-gray-600 mt-2">
                    {state === "login" ? (
                        <p>
                            Don't have an account?{" "}
                            <span onClick={() => setState("signup")} className="text-primary font-medium cursor-pointer hover:underline">Create one</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <span onClick={() => setState("login")} className="text-primary font-medium cursor-pointer hover:underline">Create one</span>
                        </p>
                    )}
                </div>

                <button type="submit" className="bg-primary hover:bg-primary-dull hover:scale-105 active:scale-95 transition-all text-white w-full py-2 rounded-md">
                    {state === "login" ? "Login" : "Create account"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;