require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

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
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        const sql = 'SELECT * FROM users';
        const [rows] = await connection.query(sql);
        console.log(rows);
        res.json(rows);
        connection.end();
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        res.status(500).json({ msg: 'something went wrong' });
    }
});


app.post('/api/users/', async(req, res) => {
    console.log('req.body ===', req.body);
    const {
        name,
        age,
        hasCar,
        town,
    } = req.body;
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
});


app.get('/api/users/drivers', async(req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        const sql = 'SELECT * FROM users WHERE hasCar = 1';
        const [rows] = await connection.query(sql);
        console.log(rows);
        if (rows.length !== 0) {
            res.json(rows);
        } else {
            res.status(404).json({ msg: 'Users hasCar not found' });
        }
        connection.end();
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        res.status(500).json({ msg: 'something went wrong' });
    }
});


app.get('/api/users/:pid', async(req, res) => {
    try {
        const pid = +req.params.pid;
        const connection = await mysql.createConnection(dbConfig);
        console.log('connected to db'.bgGreen.bold);
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await connection.execute(sql, [pid]);
        console.log(rows);
        if (rows.length === 1) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ msg: 'Users id not found' });
        }
        connection.end();
    } catch (error) {
        console.log('error connecting to db'.bgRed.bold, error);
        res.status(500).json({ msg: 'something went wrong' });
    }
});

app.get('/api/users/order/:orderDirection/', async(req, res) => {
    const order = req.params.orderDirection === 'desc' ? 'DESC' : 'ASC';
    console.log('order ===', order);
    try {
        const connection = await mysql.createConnection(dbConfig);
        const sql = `SELECT * FROM users ORDER BY name ${order}`;
        const [rows] = await connection.query(sql);
        res.json(rows);
        connection.end();
    } catch (error) {
        console.log('Error Conecting to DB'.bgRed.bold, error);
        res.status(500).json({ msg: 'something went worng' });
    }
});

app.use((req, res) => {
    res.status(404).json({
        msg: 'Not found',
    });
});

app.listen(port, () => console.log(`server is running on port ${port}`.bgYellow.bold));