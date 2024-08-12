const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
})



// connection-url -->   jdbc:mysql://sql12.freemysqlhosting.net:3306/sql12725454 