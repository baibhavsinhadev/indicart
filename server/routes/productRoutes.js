import { Router } from "express";
import { addProduct, changeInStockStatus, getProductById, listProducts } from "../controllers/productController.js";
import authSeller from "../middlewares/authSeller.js";
import upload from "../config/multer.js";

const productRouter = Router();

productRouter.post('/', upload.array("images", 4), authSeller, addProduct);
productRouter.post('/:id', authSeller, changeInStockStatus)

productRouter.get('/', listProducts);
productRouter.get('/:id', getProductById);

export default productRouter