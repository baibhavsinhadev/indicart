import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import logger from "../config/logger.js";


// Add New Product : POST /api/products
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        if (!productData) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        };

        const images = req.files;
        if (!images || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Product images required",
            });
        }

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const product = await Product.create({ ...productData, image: imageUrl });

        res.status(201).json({
            success: true,
            message: "Product Added"
        });
    } catch (error) {
        logger.error({ error }, "Add Product Error");

        res.status(500).json({
            success: false,
            message: "Failed to add product",
        });
    };
};

// List All Products : GET /api/products
export const listProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        logger.error({ error }, "List Products Error");

        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    };
};

// Get Product By Id : GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        };

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        logger.error({ error }, "Get Product Error");

        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        });
    };
};

// Change Product inStock : POST /api/products/:id
export const changeInStockStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        };

        product.inStock = !product.inStock;
        await product.save();

        res.status(200).json({
            success: true,
            message: "Stock status updated",
            inStock: product.inStock,
        });
    } catch (error) {
        logger.error({ error }, "Stock Update Error");

        res.status(500).json({
            success: false,
            message: "Failed to update stock",
        });
    };
};