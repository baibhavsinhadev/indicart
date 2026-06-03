import { Router } from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";
import authUser from "../middlewares/authUser.js";

const addressRouter = Router();

addressRouter.post("/", authUser, addAddress);
addressRouter.get("/", authUser, getAddress);

export default addressRouter;