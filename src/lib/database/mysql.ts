'use server';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import mysql from 'mysql2/promise'
import { User } from '../definitions';

const FormSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
});

const CreateUserSchema = FormSchema.omit({ id: true });
let connection: mysql.Connection;

async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'test'
    });
    return connection;
};

async function destroyConnection(conn: mysql.Connection) {
    await conn.destroy();
};

export async function createUser(prevState: string | undefined, formData: FormData) {
    const parsedData = CreateUserSchema.safeParse({
        email: formData.get('email'),
        username: formData.get('username'),
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

    try {
        const connection = await getConnection();
        await connection.execute(`
            INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)`,
            [id, email, username, hashedPassword]
        )
        await destroyConnection(connection);
    } catch (error) {
        console.error('Error:', error);
        await destroyConnection(connection);
        throw error;
    }
    redirect('/login');
}

interface UserArrayResult extends mysql.RowDataPacket {
    id: string;
    email: string;
    username: string;
    password: string;
}

export async function getUser(email: string) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute<UserArrayResult[]>(`
            SELECT id, email, username, password
            FROM users
            WHERE ? = email`,
            [email]
        );
        await destroyConnection(connection);
        const user: User = rows[0];
        return user;
    } catch (error) {
        console.error('Error:', error);
        await destroyConnection(connection);
        throw error;
    }
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