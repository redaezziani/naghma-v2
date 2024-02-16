import * as z from "zod";


export const signinSchema = z.object({
    email: z.string().email({
        message: "Email is required or invalid",
    }),
    password: z.string().refine((val) => val.length >= 8, {
        message: "Password must be at least 8 characters",
    }),
});