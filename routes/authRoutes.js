
//import
const express = require('express')
const { registerUser, loginUser, forgetPassword  } = require('../controller/authController')
const router = express.Router();

//user registration
router.post('/register', registerUser);

//user login 
router.post('/login', loginUser);

module.exports = router;
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const router = express.Router();
// const connection = require('../backend/dbConfig');  // Import database connection from a shared config

// // POST /register - Handle user registration
// router.post('/register', (req, res) => {
//     const { email, password, fullName } = req.body;

//     // Hash the password before storing it
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) {
//             return res.status(500).json({ success: false, message: "Error hashing password" });
//         }

//         // Check if the user already exists
//         connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
//             if (error) {
//                 return res.status(500).json({ success: false, message: "Server error" });
//             }
//             if (results.length > 0) {
//                 return res.status(400).json({ success: false, message: "User already exists" });
//             }

//             // Insert new user with fullName, email, and hashed password
//             connection.query('INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', 
//                 [fullName, email, hash], (error, results) => {
//                 if (error) {
//                     return res.status(500).json({ success: false, message: "Server error" });
//                 }
//                 return res.status(201).json({ success: true, message: "User registered successfully" });
//             });
//         });
//     });
// });

// // POST /login - Handle user login
// // POST /login - Handle user login
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Check if both email and password are provided
//     if (!email || !password) {
//         return res.status(400).json({ success: false, message: "Email and password are required" });
//     }

//     // Existing code to verify the email and password
//     connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
//         if (error) {
//             return res.status(500).json({ success: false, message: "Server error" });
//         }

//         if (results.length === 0) {
//             return res.status(400).json({ success: false, message: "Invalid email or password" });
//         }

//         const user = results[0];
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: "Error comparing passwords" });
//             }

//             if (isMatch) {
//                 return res.status(200).json({ success: true, message: "Login successful" });
//             } else {
//                 return res.status(400).json({ success: false, message: "Invalid email or password" });
//             }
//         });
//     });
// });

// module.exports = router;
