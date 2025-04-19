import { z } from "zod";

export const authRegisterSchema = z.object({
    name: z.string({ message: "The name field is required" }),
    password: z.string({ message: "The password field is required" }),
    confirmPassword: z.string({ message: "The confirm password field is required" })
}).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
})

export const authLoginSchema = z.object({
    name: z.string({ message: "The name field is required" }),
    password: z.string({ message: "The password field is required" })
})