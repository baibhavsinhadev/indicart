import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import AddAddress from "./components/AddAddress";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./pages/Loading";

const Home = lazy(() => import("./pages/Home"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const SellerLogin = lazy(() => import("./components/seller/SellerLogin"));
const SellerLayout = lazy(() => import("./pages/seller/SellerLayout"));
const SellerDashboard = lazy(() => import("./pages/seller/SellerDashboard"));

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin, showAddressModal, isSeller } = useAppContext();

  return (
    <div>
      <ToastContainer />
      <ScrollToTop />
      {isSellerPath ? null : <Navbar />}
      {showAddressModal ? <AddAddress /> : null}
      {showUserLogin && <LoginForm />}

      <Suspense fallback={<Loader />}>
        <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/loader" element={<Loading />} />

            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
              <Route index element={<SellerDashboard />} />
              <Route path="add-products" element={<AddProduct />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </div>
      </Suspense>

      {isSellerPath ? null : <Footer />}
    </div>
  );
};

export default App;