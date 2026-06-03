import Address from "../models/Address.js";

// Add New Address : POST /api/address
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        };

        if (!address || typeof address !== "object") {
            return res.status(400).json({
                success: false,
                message: "Invalid address data",
            });
        };

        await Address.create({ ...address, userId });
        res.status(200).json({
            success: true,
            message: "Address added successfully",
        });
    } catch (error) {
        logger.error({ error }, "Add Address Error");

        res.status(500).json({
            success: false,
            message: "Failed to add address",
        });
    };
};

// Get Address : GET /api/address
export const getAddress = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        };

        const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            addresses
        });
    } catch (error) {
        logger.error({ error }, "Get Address Error");

        res.status(500).json({
            success: false,
            message: "Failed to fetch addresses",
        });
    }
}