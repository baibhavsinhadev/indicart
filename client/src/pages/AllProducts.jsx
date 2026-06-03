import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {

    const { products, searchQuery, search } = useAppContext();
    const [currentPage, setCurrentPage] = useState(1);

    // Filter + inStock combined
    const filteredProducts = products.filter((product) => {
        const query = searchQuery.trim().toLowerCase();

        return (
            product.inStock && product.name.toLowerCase().includes(search)
        );
    });

    // Pagination
    const productsPerPage = 15;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    // Reset page on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Safety: if page > totalPages
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages]);

    return products ? (
        <div className="mt-16 flex flex-col">
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium uppercase">All Products</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            {currentProducts.length === 0 ? (
                <p className="text-gray-500 mt-6">No products found</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {currentProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                    <button onClick={() => { scrollTo(0, 0); setCurrentPage((prev) => prev - 1); }} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50">
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i} onClick={() => { scrollTo(0, 0); setCurrentPage(i + 1); }} className={`px-3 py-1 border border-gray-300 rounded ${currentPage === i + 1 ? "bg-primary text-white" : ""}`}>
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={() => { scrollTo(0, 0); setCurrentPage((prev) => prev + 1); }} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50">
                        Next
                    </button>
                </div>
            )}
        </div>
    ) : <Loader />;
};

export default AllProducts;