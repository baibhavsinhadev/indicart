import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category }) => {

    const { products } = useAppContext();
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (!products.length) return;

        const filtered = products.filter((product) =>
            product.category.toLowerCase() === category.toLowerCase());

        setRelatedProducts(filtered.slice(0, 5));
    }, [products, category]);

    if (!relatedProducts.length) return null;

    return (
        <div className="mt-16">
            <div className="flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-medium uppercase">Related Products</p>
                <div className="w-1/4 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-8 mb-8">
                {relatedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="flex justify-center">
                <Link to="/products" onClick={() => scrollTo(0, 0)} className="border border-gray-300 px-5 py-3 rounded-md hover:bg-gray-100 transition">
                    Explore more products
                </Link>
            </div>
        </div>
    );
};

export default RelatedProducts;