import { prisma } from "../libs/prisma";

export const getUserByName = async (name: string) => {
    const user = await prisma.user.findFirst({
        where: {
            name: name
        }
    });

    return user;
};

export const createUser = async(name: string, password:string) =>  {
    const user = await prisma.user.create({
        data: {
            name: name,
            password: password
        }
    });

    return user;
};