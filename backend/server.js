const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

// Route to create a new banner
app.post('/banner', (req, res) => {
    const { description, timer_settings, link } = req.body;

    // Validate the input
    if (!description || !timer_settings || !link) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // SQL query to insert a new banner into the database
    const query = 'INSERT INTO banner_data (description, timer_settings, link) VALUES (?, ?, ?)';
    db.query(query, [description, timer_settings, link], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        // Respond with the ID of the newly created banner
        res.status(201).json({ message: 'Banner created successfully', id: result.insertId });
    });
});

// Route to get all banners
app.get('/banner', (req, res) => {
    // SQL query to select all banners from the database
    const query = 'SELECT * FROM banner_data ORDER BY created_at DESC LIMIT 1';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        // Respond with the list of banners
        res.status(200).json(results);
    });
});

// Route to update a banner by ID
app.put('/banner/:id', (req, res) => {
    const { id } = req.params;
    const { description, timer_settings, link } = req.body;

    // Validate the input
    if (!description || !timer_settings || !link) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // SQL query to update the banner with the given ID
    const query = 'UPDATE banner_data SET description = ?, timer_settings = ?, link = ? WHERE id = ?';
    db.query(query, [description, timer_settings, link, id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, the banner with the given ID was not found
            return res.status(404).json({ error: 'Banner not found' });
        }
        // Respond with a success message
        res.status(200).json({ message: 'Banner updated successfully' });
    });
});

// Route to delete a banner by ID
app.delete('/banner/:id', (req, res) => {
    const { id } = req.params;

    // SQL query to delete the banner with the given ID
    const query = 'DELETE FROM banner_data WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, the banner with the given ID was not found
            return res.status(404).json({ error: 'Banner not found' });
        }
        // Respond with a success message
        res.status(200).json({ message: 'Banner deleted successfully' });
    });
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});
