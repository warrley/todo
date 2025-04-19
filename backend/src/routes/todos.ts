import express from "express";
import * as MainControler from "../controllers/todos"

export const todoRouter = express.Router();

todoRouter.get("/", MainControler.todos);