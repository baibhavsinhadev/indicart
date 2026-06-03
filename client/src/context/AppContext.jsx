import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dummyOrders, dummyProducts } from "../assets/assets";
import { toast } from "react-toastify";
import api from "../api/axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [sellerOrders, setSellerOrders] = useState([]);

    const [cartItems, setCartItems] = useState({});

    // Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await api.get("/seller/is-auth");
            setIsSeller(data.success);
        } catch (error) {
            setIsSeller(false);
        };
    };

    // Fetch User Auth Status, User Data, Cart Items
    const fetchUser = async () => {
        try {
            const { data } = await api.get("/user/is-auth");

            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                setUser(null);
                toast.error(data.message);
            };
        } catch (error) {
            setUser(null);
        };
    };

    // Fetch All Products
    const fetchProducts = useCallback(async () => {
        try {
            const { data } = await api.get("/products");

            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to load products";
            toast.error(message);
        }
    }, []);

    // Add Product to Cart
    const addToCart = useCallback((itemId) => {
        setCartItems(prev => {
            const updated = {
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1
            };
            return updated;
        });

        toast.success("Item added to cart");
    }, []);

    // Update Cart Item Quantity
    const updateCartItem = useCallback((itemId, quantity) => {
        if (quantity <= 0) return;

        setCartItems(prev => ({
            ...prev,
            [itemId]: quantity
        }));

        toast.success("Cart updated");
    }, []);

    // Remove Product from Cart
    const removeFromCart = useCallback((itemId) => {
        setCartItems(prev => {
            if (!prev[itemId]) return prev;
            const updated = { ...prev };

            if (updated[itemId] === 1) {
                delete updated[itemId];
            } else {
                updated[itemId] -= 1;
            }

            return updated;
        });

        toast.success("Removed from cart");
    }, []);

    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0;

        for (const item in cartItems) {
            totalCount += cartItems[item];
        }

        return totalCount;
    };

    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            let itemInfo = products.find((p) => p._id === item);
            if (!itemInfo) continue;
            totalAmount += itemInfo.offerPrice * cartItems[item];
        };

        return Math.floor(totalAmount * 100) / 100;
    };

    // Fetch Orders
    const fetchOrders = async () => {
        setOrders(dummyOrders);
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        fetchSeller();
        fetchUser();
    }, []);

    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await api.post('/cart/update', { cartItems });
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                const message = error.response?.data?.message || "Something went wrong";
                toast.error(message);
            };
        };

        if (user) {
            updateCart();
        };
    }, [cartItems])

    const value = {
        navigate, user, setUser, isSeller,
        setIsSeller, showUserLogin, setShowUserLogin, products,
        setProducts, currency, addToCart, updateCartItem,
        removeFromCart, cartItems, searchQuery, setSearchQuery,
        search, setSearch, getCartCount, getCartAmount,
        showAddressModal, setShowAddressModal, orders, setOrders,
        fetchProducts, setCartItems, sellerOrders, setSellerOrders
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within AppProvider");

    return context;
};