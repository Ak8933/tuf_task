const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Your other server code...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
