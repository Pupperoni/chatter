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


// User

export async function createUser(username: string, email: string, password: string) {
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
        );
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


// Room

export async function createRoom(userId: string, roomName: string) {
    const roomId = uuidv4();
    const roomOwnerId = uuidv4();
    const userJoinRoomId = uuidv4();
    try {
        const connection = await getConnection();
        await connection.execute(`
            INSERT INTO rooms (id, name) VALUES (?, ?)`,
            [roomId, roomName]
        );

        await connection.execute(`
            INSERT INTO room_owners (id, room_id, owner_id) VALUES (?, ?, ?)`,
            [roomOwnerId, roomId, userId]
        );

        await connection.execute(`
            INSERT INTO user_joined_rooms (id, room_id, user_id) VALUES (?, ?, ?)`,
            [userJoinRoomId, roomId, userId]
        )
        await destroyConnection(connection);
        return { id: roomId, roomName: roomName };
    } catch (error) {
        console.error('Error:', error);
        await destroyConnection(connection);
        throw error;
    }
}

export async function addJoinedRoom(roomId: string, userId: string) {
    const id = uuidv4();
    try {
        const connection = await getConnection();
        await connection.execute(`
            INSERT INTO user_joined_rooms (id, room_id, user_id) VALUES (?, ?, ?)`,
            [id, roomId, userId]
        )
        await destroyConnection(connection);
    } catch (error) {
        console.error('Error:', error);
        await destroyConnection(connection);
        throw error;
    }
}


// Message