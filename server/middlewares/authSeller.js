import jwt from "jsonwebtoken";
import logger from "../config/logger.js";

const authSeller = async (req, res, next) => {
    try {
        const sellerToken = req.cookies?.sellerToken;
        if (!sellerToken) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized",
            });
        }

        // Verify token
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        // Check role
        if (decoded.role !== "seller" || decoded.email !== process.env.SELLER_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Seller access only",
            });
        }

        // Attach seller info
        req.seller = {
            email: decoded.email
        };

        next();
    } catch (error) {
        logger.warn({ error }, "Seller Auth Error");

        return res.status(401).json({
            success: false,
            message: "Unauthorized - Token failed",
        });
    };
};

export default authSeller;