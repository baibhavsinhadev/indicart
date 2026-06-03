import { useAppContext } from "../context/AppContext";
import Bestseller from "../components/Bestseller";
import BottomBanner from "../components/BottomBanner";
import Categories from "../components/Categories";
import MainBanner from "../components/MainBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {

    const { products } = useAppContext();

    return (
        <div className="mt-10">
            <MainBanner />
            <Categories />
            {products.filter((product) => product.inStock).length !== 0 ? <Bestseller /> : null}
            <BottomBanner />
            <NewsLetter />
        </div>
    );
};

export default Home;