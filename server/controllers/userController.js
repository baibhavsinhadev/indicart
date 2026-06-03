import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../config/logger.js";

// Generate Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Cookie Options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Register New User : POST /api/user/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required",
            });
        };

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be 8+ chars",
            });
        };

        // Check existing
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        };

        // Hash password
        const hashedPassword = await argon2.hash(password);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = generateToken(user._id);
        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "Registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        logger.error({ error }, "Register Error");

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};

// Login Existing User : POST /api/user/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & password required",
            });
        };

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        };

        // Verify password
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        };

        // Generate token
        const token = generateToken(user._id);
        res.cookie("token", token, cookieOptions);

        logger.info({ userId: user._id }, "User logged in");

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        logger.error({ error }, "Login Error");

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};

// Check Auth : GET /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized",
            });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        logger.error({ error }, "Check Auth Error");

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };
};

// Logout User : POST /api/user/logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        logger.error({ error }, "Logout Error");

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}