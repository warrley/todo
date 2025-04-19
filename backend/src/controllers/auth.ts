import { RequestHandler } from "express";
import { authLoginSchema, authRegisterSchema } from "../schemas/auth";
import { createUser, getUserByName } from "../services/user";
import bcrypt from "bcrypt"

export const register: RequestHandler = async(req, res) => {
    const data = authRegisterSchema.safeParse(req.body);
    if(!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const { name, password } = data.data;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await getUserByName(name);
    if(user) {
        res.json({ error: "Already has a user with this name" });
        return;
    }

    const newUser = await createUser(name, hashPassword);

    res.json({ newUser });
};

export const login: RequestHandler = async(req, res) => {
    const data = authLoginSchema.safeParse(req.body);
    
    if(!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const { name, password } = data.data;

    const user = await getUserByName(name);
    if(!user) {
        res.json({ error: "User dont exist" });
        return;
    };

    const passwordMatch = await bcrypt.compare(password, user?.password as string);
    if(!passwordMatch) {
        res.json({ error:  "wrong password"});
        return;
    }

    res.json({ user: user });
};