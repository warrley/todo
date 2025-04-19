import express from "express";
import * as AuthController from "../controllers/auth";

export const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
