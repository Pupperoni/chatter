'use server';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { signIn } from '@/auth';
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

async function init() {
    const testUserPassword = await bcrypt.hash('password', 10);
    users.push(
        { id: 'test-user', email: 'test@test.com', username: 'test', password: testUserPassword }
    )
}

init();

export async function createUser(prevState: string | undefined, formData: FormData) {
    // export async function createUser(email: string, username: string, password: string) {
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