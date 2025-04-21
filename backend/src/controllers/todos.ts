import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import { createTodoDb, editTodoDb, getTodosById } from "../services/todo";
import { createTodoSchema, editTodoSchema } from "../schemas/todos";

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

    res.json({ newTodo });
};

export const editTodo: RequestHandler = async (req, res) => {
    const data = editTodoSchema.safeParse(req.body);
    if(!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const { id, title, description, status } = data.data;

    const todo = await editTodoDb(id, title, description, status);

    res.json({ todo: todo })
};