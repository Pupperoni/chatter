'use server';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise'
import { User } from '../definitions';

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

export async function createUser({ username, email, password }: { username: string, email: string, password: string }) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: id,
        username: username,
        email: email
    }
    try {
        const connection = await getConnection();
        await connection.execute(`
            INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)`,
            [id, email, username, hashedPassword]
        )
        await destroyConnection(connection);
        return newUser;
    } catch (error) {
        console.error('Error:', error);
        await destroyConnection(connection);
        throw error;
    }
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
