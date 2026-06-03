const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
            <h1 className="md:text-4xl text-2xl font-medium">Never Miss a Deal!</h1>
            <p className="md:text-lg text-gray-500/80! pb-8">Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>

            <div className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500" placeholder="Enter your email id" type="text" />

                <button className="md:px-12 px-8 h-full text-white bg-primary rounded-md rounded-l-none">Subscribe</button>
            </div>
        </div>
    );
};

export default NewsLetter;