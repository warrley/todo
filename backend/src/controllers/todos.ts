import { RequestHandler } from "express";

export const todos: RequestHandler = (req, res) => {
    const authorization = req.headers.authorization;
    res.json({ authorization });
};