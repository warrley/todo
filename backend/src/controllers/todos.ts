import { Response } from "express";
import { AuthenticatedRequest } from "../types/express";

export const todos = (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    res.json({ user })
};