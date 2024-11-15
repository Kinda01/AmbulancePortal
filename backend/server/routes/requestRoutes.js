const express = require('express');
const router = express.Router();
const connection = require('../backend/dbConfig');  // Import the database connection

// POST /request - Handle ambulance requests
router.post('/request', (req, res) => {
    const { name, location, details } = req.body;

    const query = 'INSERT INTO requests (name, location, details, status) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, location, details, 'Pending'], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, message: "Request submitted successfully" });
    });
});

// GET /requests - Fetch all requests (for admin)
router.get('/requests', (req, res) => {
    const query = 'SELECT * FROM requests';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
