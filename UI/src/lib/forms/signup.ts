import { z } from 'zod';
import type { SignUpData } from '../../api';

interface SignUpFormData extends SignUpData {
    PasswordConfirm: string;
}

export const registerSchema = z
    .object({
        FullName: z
            .string({ error: 'Name is required' })
            .min(1, { message: 'Name is required' })
            .max(64, { message: 'Name must be less than 64 characters' })
            .trim(),
        Email: z
            .string({ error: 'Email is required' })
            .min(1, { message: 'Email is required' })
            .max(64, { message: 'Email must be less than 64 characters' })
            .email({ message: 'Email must be a valid email address' }),
        Password: z
            .string({ error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters' })
            .max(32, { message: 'Password must be less than 32 characters' })
            .trim(),
        PasswordConfirm: z
            .string({ error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters' })
            .max(32, { message: 'Password must be less than 32 characters' })
            .trim(),
    })
    .superRefine(({ PasswordConfirm, Password }, ctx) => {
        if (PasswordConfirm !== Password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password must match',
                path: ['password']
            });
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password must match',
                path: ['PasswordConfirm']
            });
        }
    });

export const actions = {
    default: async (data: SignUpData) => {
        try {
            const result = registerSchema.parse(data);
            console.log('SUCCESS');
            console.log(result);
        } catch (err: any) {
            const { fieldErrors: errors } = err.flatten();
            return {
                data,
                errors
            };
        }
    }
};