import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { categories } from "../assets/assets";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {

    const { products } = useAppContext();
    const { category } = useParams();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category);

    useEffect(() => {
        if (!products) return;

        const result = products.filter((product) => product.category.toLowerCase() === category.toLowerCase()).filter((product) => product.inStock);

        setFilteredProducts(result);
    }, [products, category]);

    return (
        <div className="mt-16">
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium uppercase">{searchCategory?.text || category}</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCategory;