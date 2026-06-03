import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { XCircle } from "lucide-react";
import api from "../api/axios";
import { toast } from "react-toastify";

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => {
    return (
        <input
            className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-2 focus:border-primary transition"
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required
        />
    );
}

const AddAddress = () => {

    const { showAddressModal, setShowAddressModal, navigate, user } = useAppContext();
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post('/address', { address });
            if (data.success) {
                toast.success(data.message);
                navigate('/cart');
                setShowAddressModal(false)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        };
    };

    useEffect(() => {
        if (!user) {
            setShowAddressModal(false);
        };
    }, [user]);

    if (!showAddressModal) return null;

    return (
        <div onClick={() => setShowAddressModal(false)} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-276 h-[90vh] overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <p className="text-2xl md:text-3xl text-gray-600">
                        Add Shipping{" "}
                        <span className="font-semibold text-indigo-500">Address</span>
                    </p>

                    <form onSubmit={onSubmitHandler} className="mt-8 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />

                            <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
                        </div>

                        <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email address" />

                        <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />

                        <div className="flex flex-col md:flex-row gap-4">
                            <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />

                            <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zipcode" />

                            <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
                        </div>

                        <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone Number" />

                        <button className="w-full bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase">Save address</button>
                    </form>
                </div>

                <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
                    <img src={assets.add_address_iamge} alt="add_address" className="max-w-[80%] object-contain" />
                </div>
            </div>

            <button onClick={() => setShowAddressModal(false)} className="absolute top-12 right-36 group">
                <div className="p-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-red-50 hover:border-red-400 transition-all duration-200 ease-in-out">
                    <XCircle size={22} className="text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
                </div>
            </button>
        </div>
    );
};

export default AddAddress;