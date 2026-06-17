import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string().min(2, 'First name should be atleast 2 chars long'),
    lastName: z.string().min(2, 'Last name should be atleast 2 chars long'),
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password should be atleast 6 chars long'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    error: 'Password mismatch',
    path: ['confirmPassword']
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;