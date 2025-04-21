import { prisma } from "../libs/prisma"

export const getTodosById = async (id: number) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: id
        }
    });
    return todos;
};

export const createTodoDb = async(title: string, description: string | undefined, userId: number) => {
    const newTodo = await prisma.todo.create({
        data: {
            title: title,
            description: description,
            userId: userId,
            status: false
        }
    })
    return newTodo;
};

export const editTodoDb = async (id: number, title: string, description: string | undefined, status: boolean | undefined) => {
    const todo = await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title: title,
            description: description,
            status: status
        }
    });

    return todo;
};