import jwt from "jsonwebtoken";
import logger from "../config/logger.js";

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            });
        }

        // Attach user safely
        req.user = {
            id: decoded.userId
        };

        next();
    } catch (error) {
        logger.warn({ error }, "Auth Middleware Error");

        // Token expired / invalid
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Token failed",
        });
    }
};

export default authUser;