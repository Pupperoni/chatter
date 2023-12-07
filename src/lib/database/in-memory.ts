'use server';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { signIn } from '../auth';
// import { signIn } from 'next-auth/react';
import { User } from '@/lib/definitions';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
});

const CreateUserSchema = FormSchema.omit({ id: true });
const users: User[] = [];

export async function createUser(prevState: string | undefined, formData: FormData) {
    const parsedData = CreateUserSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    });


    if (!parsedData.success) {
        console.log('Invalid data');
        return 'Invalid data';
    }

    const { username, email, password, confirmPassword } = parsedData.data;

    if (password !== confirmPassword) {
        console.log('Passwords do not match.');
        return 'Passwords do not match.';
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: id,
        email: email,
        username: username,
        password: hashedPassword
    }

    // TODO: check if email/username already exists (sql can set no duplicates)
    users.push(newUser);
    console.log('created new user', newUser);
    redirect('/login');
}

export async function getUser(email: string) {
    const foundUser = users.find((user: User) => {
        return user.email === email;
    });

    return foundUser;
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', Object.fromEntries(formData));
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialsSignin';
        }
        throw error;
    }
}