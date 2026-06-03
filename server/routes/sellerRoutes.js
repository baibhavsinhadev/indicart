import { Router } from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.post("/logout", sellerLogout);

sellerRouter.get("/is-auth", authSeller, isSellerAuth);

export default sellerRouter;