import express from "express";
import * as todoController from "../controllers/todos"
import { privateRoute } from "../middleware/private-route";

export const todoRouter = express.Router();

todoRouter.get("/", privateRoute, todoController.todos)