console.log('server.js');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const { connect } = require('http2');

const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5000;

// Config
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'type12',
};

// MIddleware
app.use(morgan('dev'));
// app.use(cors());

// connect(process.env.LOGIN, process.env.PASS)

// Routes
app.get('/', (req, res) => {
  res.json({ msg: 'server online' });
});

app.get('/api/posts', async (reg, pes) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    console.log('conect db');

    res.send('triing');
  } catch (error) {
    console.log(`no conect db ${error}`);
  }
});

app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

console.log('process.env.LOGIN ===', process.env.LOGIN);

app.listen(port, () => console.log(`server running on port ${port}`));
