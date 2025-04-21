import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string({ message: "Title field is requiresd" }),
    description: z.string().optional(),
})