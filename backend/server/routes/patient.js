// server/routes/patient.js (or in your main backend app file)

const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Path to your database config file

// Example route to get patient details
router.get('/patient-details', async (req, res) => {
  try {
    // Replace with your actual database query logic
    const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [1]); // Example query to get a specific patient
    if (rows.length > 0) {
      res.json(rows[0]);  // Send the first patient's data
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (err) {
    console.error('Error fetching patient data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
