const express = require('express')
const next = require('next')
const mysql = require('mysql2/promise');

(async function init() {
    console.log('Initializing MySQL connection...');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'test'
    });

    await connection.execute(
        `CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(50) PRIMARY KEY,
            email VARCHAR(40) UNIQUE,
            username VARCHAR(40) UNIQUE,
            password VARCHAR(100)
        );`
    )

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

