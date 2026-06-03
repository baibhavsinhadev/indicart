import { Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const ProductCard = ({ product }) => {

    const { currency, cartItems, addToCart, removeFromCart, updateCartItem } = useAppContext();
    const count = cartItems[product._id] || 0;

    return product ? (
        <Link to={`/products/${product.category.toLowerCase()}/${product._id}`} onClick={() => scrollTo(0, 0)} className="border border-gray-500/20 rounded-md max-w-54 md:px-4 px-3 py-2">
            <div className="group cursor-pointer flex items-center justify-center py-2">
                <img src={product.image[0]} alt={product.name} className="group-hover:scale-105 transition max-w-26 md:max-w-36 group-active:scale-95" />
            </div>

            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <h3 className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</h3>

                <div className="flex items-center gap-0.5">
                    {Array(5).fill("").map((_, i) => (
                        <Star key={i} size={14} className={`${i < 4 ? "fill-primary text-primary" : "text-gray-300"}`} />
                    ))}

                    <span>(200)</span>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <p className="md:text-xl flex items-center gap-1 text-base font-medium">
                        <span className="text-primary">{currency}{product.offerPrice}</span>
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>

                    <div className="text-primary">
                        {count === 0 ? (
                            <button onClick={(e) => { e.preventDefault(); addToCart(product._id); }} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-xs font-medium hover:bg-primary hover:text-white transition">
                                <ShoppingCart size={14} />
                                Add
                            </button>
                        ) : (
                            <div onClick={(e) => e.preventDefault()} className="flex items-center gap-2 bg-primary/10 px-2 py-1.5 rounded-lg">
                                <button onClick={() => removeFromCart(product._id)} className="hover:scale-110 active:scale-95 transition">
                                    <Minus size={14} />
                                </button>

                                <span className="text-sm font-medium w-4 text-center">
                                    {count}
                                </span>

                                <button onClick={() => addToCart(product._id)} className="hover:scale-110 active:scale-95 transition">
                                    <Plus size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    ) : (
        <Loader />
    );
};

export default ProductCard;