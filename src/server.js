const express = require('express')
const next = require('next')
const mysql = require('mysql2/promise');

// TODO: move server init to other file
(async function init() {
    console.log('Initializing MySQL connection...');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'test'
    });

    // TODO: add index

    await connection.execute(`DROP TABLE IF EXISTS room_messages;`);
    await connection.execute(`DROP TABLE IF EXISTS user_joined_rooms;`);
    await connection.execute(`DROP TABLE IF EXISTS room_owners;`);
    await connection.execute(`DROP TABLE IF EXISTS messages;`);
    await connection.execute(`DROP TABLE IF EXISTS rooms;`);
    await connection.execute(`DROP TABLE IF EXISTS users;`);

    await connection.execute(
        `CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(50) PRIMARY KEY,
            email VARCHAR(40) UNIQUE,
            username VARCHAR(40) UNIQUE,
            password VARCHAR(100)
        );`
    );

    await connection.execute(
        `CREATE TABLE IF NOT EXISTS rooms (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(20)
        );`
    );

    await connection.execute(
        `CREATE TABLE IF NOT EXISTS messages (
            id VARCHAR(50) PRIMARY KEY,
            content VARCHAR(100)
        );`
    );

    await connection.execute(
        `CREATE TABLE IF NOT EXISTS room_owners (
            id VARCHAR(50) PRIMARY KEY,
            room_id VARCHAR(50),
            owner_id VARCHAR(50),
            FOREIGN KEY (room_id) REFERENCES rooms(id),
            FOREIGN KEY (owner_id) REFERENCES users(id)
        );`
    );

    await connection.execute(
        `CREATE TABLE IF NOT EXISTS user_joined_rooms (
            id VARCHAR(50) PRIMARY KEY,
            room_id VARCHAR(50),
            user_id VARCHAR(50),
            FOREIGN KEY (room_id) REFERENCES rooms(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );`
    );

    await connection.execute(
        `CREATE TABLE IF NOT EXISTS room_messages (
            id VARCHAR(50) PRIMARY KEY,
            room_id VARCHAR(50),
            user_id VARCHAR(50),
            message_id VARCHAR(50),
            FOREIGN KEY (room_id) REFERENCES rooms(id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (message_id) REFERENCES messages(id)
        );`
    );

    await connection.destroy();
    console.log('MySQL database setup complete');

    const app = next({ dev: true });
    const handler = app.getRequestHandler();

    await app.prepare();

    const server = express();

    server.all('*', (req, res) => {
        return handler(req, res);
    });

    server.listen(3000);
    console.log('Server is ready');
})();

