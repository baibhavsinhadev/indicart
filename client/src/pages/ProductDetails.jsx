import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Minus, Plus, Star } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetails = () => {

    const { products, currency, addToCart, getCartCount, removeFromCart, cartItems } = useAppContext();
    const { category, productId } = useParams();

    const [productDetails, setProductDetails] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        if (!products.length) return;

        const foundProduct = products.find((product) =>
            product._id === productId &&
            product.category.toLowerCase() === category.toLowerCase()
        );

        setProductDetails(foundProduct || null);
        setThumbnail(foundProduct?.image?.[0] || null);
    }, [products, category, productId]);

    const quantity = cartItems[productDetails?._id] || 0;

    if (!productDetails) {
        return <p className="mt-10 text-gray-500">Product not found</p>;
    }

    return productDetails ? (
        <div className="mt-12">
            <div className="flex gap-1 font-base text-gray-700">
                <Link to="/">Home</Link>

                <p>/</p>

                <Link to="/products">Products</Link>

                <p>/</p>

                <Link to={`/products/${productDetails.category}`}>{productDetails.category}</Link>

                <p>/</p>

                <span className="text-primary">{productDetails.name}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {productDetails.image?.map((img, index) => (
                            <div key={index} onClick={() => setThumbnail(img)} className={`border-2 max-w-24 ${thumbnail === img ? "border-primary" : "border-gray-500/30"} rounded overflow-hidden cursor-pointer`}>
                                <img src={img} alt={productDetails.name} />
                            </div>
                        ))}
                    </div>

                    <div className="border-2 border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt={productDetails.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{productDetails.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill("").map((_, i) => (
                            <Star key={i} size={14} className={`${i < 4 ? "fill-primary text-primary" : "text-gray-300"}`} />
                        ))}

                        <span>(200)</span>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{productDetails.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{productDetails.offerPrice}</p>

                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>

                    <ul className="list-disc ml-4 text-gray-500/70">
                        {productDetails.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    {quantity === 0 ? (
                        <button onClick={() => addToCart(productDetails._id)} className="w-full mt-10 py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            Add to cart
                        </button>
                    ) : (
                        <div className="flex items-center justify-between w-full mt-10 bg-white border border-gray-200 overflow-hidden">
                            <button onClick={() => removeFromCart(productDetails._id)} className="flex-1 py-3 flex justify-center items-center hover:bg-red-100 hover:text-red-600 active:scale-95 transition">
                                <Minus size={14} />
                            </button>

                            <span className="flex-1 text-sm font-medium text-center">
                                {getCartCount()}
                            </span>

                            <button onClick={() => addToCart(productDetails._id)} className="flex-1 py-3 flex justify-center items-center hover:bg-green-100 hover:text-green-600 active:scale-95 transition">
                                <Plus size={14} />
                            </button>
                        </div>
                    )}

                    <p className="list-none mt-5 text-gray-800">Cash on delivery is available on all products</p>
                </div>
            </div>

            <RelatedProducts category={productDetails.category} />
        </div>
    ) : <Loader />;
};

export default ProductDetails;