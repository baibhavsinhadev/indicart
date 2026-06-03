import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Loading = () => {

    const { navigate } = useAppContext();
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const nextURL = query.get("next");

    useEffect(() => {
        if (nextURL) {
            setTimeout(() => {
                navigate(`${nextURL}`);
            }, 5000);
        }
    }, [nextURL])

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary" />
        </div>
    );
};

export default Loading;