import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import { createTodoDb, getTodosById } from "../services/todo";
import { createTodoSchema } from "../schemas/todos";

export const getTodos = async(req: AuthenticatedRequest, res: Response) => {
    const id = req.user?.id;
    const todos = await getTodosById(id as number);
    res.json({ todos })
};

export const createTodo = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    const data = createTodoSchema.safeParse(req.body)
    if(!data.success){
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const { title, description } = data.data

    const newTodo = await createTodoDb(title, description, user?.id as number)

    res.json({ data });
}