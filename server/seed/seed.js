import "dotenv/config";
import connectDB from "../config/connectDB.js";
import connectCloudinary from "../config/connectCloudinary.js";
import Product from "../models/Product.js";
import logger from "../config/logger.js";
import path from "path";
import { dummyProducts } from "./assets.js";
import { v2 as cloudinary } from "cloudinary";

async function productDump() {
    try {
        await connectDB();
        await connectCloudinary();

        await Product.deleteMany();
        logger.info("All Products Deleted");

        const updatedProducts = [];

        for (let item of dummyProducts) {
            const uploadedImages = [];

            for (let img of item.image) {
                const result = await cloudinary.uploader.upload(path.resolve(img), {
                    folder: "products",
                });

                uploadedImages.push(result.secure_url);
            }

            updatedProducts.push({
                ...item,
                image: uploadedImages,
            });
        }

        await Product.insertMany(updatedProducts);
        console.log("Data Seeded with Cloudinary 🚀");
        process.exit();
    } catch (error) {
        console.error("Error seeding data ❌", error);
        process.exit(1);
    };
};

productDump();