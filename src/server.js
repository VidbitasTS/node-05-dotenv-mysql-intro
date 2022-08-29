require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
//const { restart } = require('nodemon');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Server online ok' });
});

app.get('/api/users', async(req, res) => {
    try {
        // 1.prisijunkti prie duomenu bazes
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        // 2. atlikti veiksma
        // const sql = 'SELECT * FROM posts WHERE id = 2';
        const sql = 'SELECT * FROM users';
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

app.get('/api/posts/order/:orderDirection/', async(req, res) => {
    const order = req.params.orderDirection === 'desc' ? 'DESC' : 'ASC';
    // const order = req.params.orderDirection;
    console.log('order ===', order);
    try {
        // 1. prisijungti prie db
        const connection = await mysql.createConnection(dbConfig);
        // console.log('Conected to DB'.bgGreen.bold);
        // 2. atlikti veiksma
        const sql = `SELECT * FROM posts ORDER BY author ${order}`;
        const [rows] = await connection.query(sql);
        res.json(rows);
        // 3.uzdaryti prisijungima
        connection.end();
    } catch (error) {
        console.log('Error Conecting to DB'.bgRed.bold, error);
        // 4. gaudyti klaidas
        res.status(500).json({ msg: 'something went worng' });
    }
});



app.post('/api/users/', async(req, res) => {
    console.log('req.body ===', req.body);
    const { name, age, hasCar, town } = req.body
    try {
        const conn = await mysql.createConnection(dbConfig);
        const sql = 'INSERT INTO users (name, age, hasCar, town) VALUES (?, ?, ?, ?)';
        const [rows] = await conn.execute(sql, [name, age, hasCar, town]);
        if (rows.affectedRows === 1) {
            res.status(201).json({ msg: 'User created' });
        } else {
            throw new Error('now rows affected');
        }
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        res.status(500).json({ msg: 'something went wrong' });

    }
})


app.get('/api/users/:pid', async(req, res) => {
    try {
        const pid = +req.params.pid
            // 1.prisijunkti prie duomenu bazes
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        // 2. atlikti veiksma
        const sql = 'SELECT * FROM users WHERE id = ?';
        // const sql = 'SELECT * FROM posts';
        const [rows] = await connection.execute(sql, [pid]);
        console.log(rows);
        if (rows.length === 1) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ msg: 'Users id not found' })
        }
        // 3. uzdaryti prisijungima
        connection.end();
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        // 4. gaudyti klaidas
        res.status(500).json({ msg: 'something went wrong' });
    }
});

app.get('/api/posts/category/:catName', async(req, res) => {
    try {
        const catName = req.params.catName;
        // 1.prisijunkti prie duomenu bazes
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        // 2. atlikti veiksma
        const sql = 'SELECT * FROM posts WHERE category = ?';
        // const sql = 'SELECT * FROM posts';
        const [rows] = await connection.execute(sql, [catName]);
        console.log(rows);
        if (rows.length !== 0) {
            res.json(rows);
        } else {
            res.status(404).json({ msg: 'Post category not found' })
        }
        // 3. uzdaryti prisijungima
        connection.end();
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        // 4. gaudyti klaidas
        res.status(500).json({ msg: 'something went wrong' });
    }
});


app.use((req, res) => {
    res.status(404).json({
        msg: 'Not found',
    });
});

app.listen(port, () => console.log(`server is running on port ${port}`.bgYellow.bold));