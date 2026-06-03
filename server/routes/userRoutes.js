import { Router } from "express";
import { isAuth, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/is-auth", authUser, isAuth)

export default userRouter;