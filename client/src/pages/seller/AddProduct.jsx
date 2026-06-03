import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { XIcon } from "lucide-react";

const AddProduct = () => {

    const [images, setImages] = useState([null, null, null, null]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        offerPrice: "",
    });

    const addImages = (files) => {
        const newImages = [...images];
        let index = newImages.findIndex(img => img === null);

        for (let file of files) {
            if (index === -1) break;

            newImages[index] = file;
            index = newImages.findIndex(img => img === null);
        }

        setImages(newImages);
    };

    // Handle Image Upload
    const handleImageChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const productData = {
                name: formData.name,
                description: formData.description.split("\n"),
                category: formData.category,
                price: Number(formData.price),
                offerPrice: Number(formData.offerPrice),
            };

            const formDataToSend = new FormData();
            formDataToSend.append("productData", JSON.stringify(productData));

            images.forEach((img) => {
                if (img) {
                    formDataToSend.append("images", img);
                }
            });

            const { data } = await api.post('/products', formDataToSend);
            if (data.success) {
                toast.success(data.message);

                setFormData({
                    name: "",
                    description: "",
                    category: "",
                    price: "",
                    offerPrice: "",
                });

                setImages([null, null, null, null]);
            } else {
                toast.error(data.message);
            };
        } catch (error) {
            toast.error("Add Product Error");
        }
    };

    return (
        <div className="overflow-y-scroll">
            <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Images</p>

                    <div onDrop={(e) => {
                        e.preventDefault();
                        const files = Array.from(e.dataTransfer.files);
                        addImages(files);
                    }} onChange={(e) => {
                        const files = Array.from(e.target.files);
                        addImages(files);
                    }} className="flex gap-3 mt-2 flex-wrap">
                        {images.map((img, index) => (
                            <label key={index} className="relative cursor-pointer">
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        addImages(files);
                                    }}
                                />

                                <img src={img ? URL.createObjectURL(img) : assets.upload_area} className={`${img ? "w-24 h-24" : "w-24.5"} object-cover rounded`} />

                                {img && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const newImages = [...images];
                                            newImages[index] = null;
                                            setImages(newImages);
                                        }}
                                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                    >
                                        <XIcon size={16} />
                                    </button>
                                )}
                            </label>
                        ))}
                    </div>


                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-medium">Product Name</label>

                    <input id="name" placeholder="Enter product name" value={formData.name} onChange={handleChange} type="text" className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 bg-white focus:border-2 focus:border-primary transition" required />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-medium">Product Description</label>

                    <textarea id="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Enter product description" className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-2 focus:border-primary transition bg-white resize-none" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-medium">Category</label>

                    <select id="category" value={formData.category} onChange={handleChange} className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-2 bg-white focus:border-primary transition">
                        <option value="">---- Select product category ----</option>

                        {categories.map((category, index) => (
                            <option value={category.text} key={index}>{category.text}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4">
                    <input id="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none bg-white text-gray-500 focus:border-2 focus:border-primary transition" required />

                    <input id="offerPrice" value={formData.offerPrice} onChange={handleChange} type="number" placeholder="Offer Price" className="w-full px-2 py-2.5 border border-gray-500/30 rounded bg-white outline-none text-gray-500 focus:border-2 focus:border-primary transition" required />
                </div>

                <button className="w-full active:scale-95 hover:scale-105 bg-primary text-white px-6 py-2 hover:bg-primary-dull transition">
                    ADD PRODUCT
                </button>
            </form>
        </div>
    );
};

export default AddProduct;