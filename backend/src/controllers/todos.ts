import { RequestHandler } from "express";
import { readJWT } from "../libs/jwt";

export const todos: RequestHandler = (req, res) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        res.json({ error: "without token" });
        return;
    };

    const token = authorization.split(' ')[1];

    try {
        const decoded = readJWT(token);
        res.json({ message: "valid token", user: decoded})
    } catch (err) {
        res.json({ error: err });
    };
};