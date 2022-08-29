require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
//const { connect } = require('http2');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5000;

// Config
const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
};

console.log('dbConfig === ', dbConfig)

// Middleware
app.use(morgan('dev'));
//app.use(cors());

// connect(process.env.LOGIN, process.env.PASS)

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Server online ok' });
});

// app.use((req, res) => {
//     res.status(404).json({
//         msg: 'Not found',
//     });
// });

app.get('/api/posts', async(req, res) => {
    try {
        // 1.prisijunkti prie duomenu bazes
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        // 2. atlikti veiksma
        // const sql = 'SELECT * FROM posts WHERE id = 2';
        const sql = 'SELECT * FROM posts';
        const [rows, fields] = await connection.query(sql);
        console.log(rows, fields);
        res.json(rows);
        // 3. uzdaryti prisijungima
        connection.end();
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        // 4. gaudyti klaidas
        res.status(500).json({ msg: 'something went wrong' });
    }
});

app.get('/api/posts/order/:order', async(req, res) => {
    try {
        const { order } = req.params;
        // 1.prisijunkti prie duomenu bazes
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        // 2. atlikti veiksma
        // const sql = 'SELECT * FROM posts WHERE id = 2';
        const sql = `SELECT * FROM posts ORDER BY author ${order}`;
        const [rows] = await connection.query(sql);
        console.log(rows);
        res.json(rows);
        // 3. uzdaryti prisijungima
        connection.end();
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        // 4. gaudyti klaidas
        res.status(500).json({ msg: 'something went wrong' });
    }
});

app.listen(port, () => console.log(`server is running on port ${port}`.bgYellow.bold));