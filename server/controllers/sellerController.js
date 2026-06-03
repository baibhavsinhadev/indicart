import logger from "../config/logger.js";
import jwt from "jsonwebtoken";

// Seller Login : POST /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required",
            });
        };

        // Check credentials from env
        if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "Invalid seller credentials",
            });
        };

        // Generate token
        const sellerToken = jwt.sign(
            {
                email,
                role: "seller",
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set cookie
        res.cookie("sellerToken", sellerToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Seller login successful",
        });
    } catch (error) {
        logger.error({ error }, "Seller Login Error");

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};

// Check Seller Auth : GET /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        const seller = req.seller;
        if (!seller) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized",
            });
        };

        return res.status(200).json({
            success: true,
            seller: {
                email: seller.email,
            },
        });
    } catch (error) {
        logger.error({ error }, "Seller Auth Check Error");

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};

// Seller Logout : POST /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Seller logged out successfully",
        });

    } catch (error) {
        logger.error({ error }, "Seller Logout Error");

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};