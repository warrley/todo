import { NextFunction, Request, Response } from "express";
import { getUserByName } from "../services/user";
import bcrypt from "bcrypt";
import { AuthenticatedRequest } from "../types/express";

export const privateRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let success = false;

    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        res.json({ error: "requisiton without token" });
        return;
    };

    const decoded = Buffer.from(token, "base64").toString();
    const [ name, password ] = decoded.split(":");

    const user = await getUserByName(name);
    if(user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            req.user = user;
            success = true;
        };
    };

    if(success) {
        next();
    } else {
        res.json({ error: "Not authorized" });
    };
}