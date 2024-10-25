const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');  // Import MySQL module
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing
const session = require('express-session');  // Import express-session
const MySQLStore = require('express-mysql-session')(session);  // Import express-mysql-session
const requestRoutes = require('./routes/requestRoutes');  // Import request routes
const authRoutes = require('./routes/authRoutes');  // Import authentication routes

require('dotenv').config({ path: './config/.env' }); // Load environment variables


const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.use('/auth', authRoutes)

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@2002Mysql#',
    database: 'ambulance_db'
});

// Connect to the MySQL database
db.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create session store using MySQL
const sessionStore = new MySQLStore({}, db);

// Use session middleware
app.use(session({
    key: 'session_cookie_name',
    secret: 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,  // 1 hour
        secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
        httpOnly: true  // Prevent client-side access to the cookie
    }
}));

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));
});

// Serve the registration page
app.get('/register', (req, res) => {
    res.render('register'); // Renders the register.ejs view
});
app.get('/patientdetails', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'patientdetails.html'));
});


app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/login.html'));
});
// Handle registration form submission
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if email already exists
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password and save it
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            db.query(insertQuery, [email, hash], (err, result) => {
                if (err) {
                    console.error('Error inserting into database:', err);
                    return res.status(500).json({ message: 'Database error' });
                }

                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

// Handle login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Set session after successful login
            req.session.userId = results[0].id;  // Save user ID in session
            res.json({ message: 'Login successful' });
        });
    });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mount the request and authentication routes
app.use('/api/requests', requestRoutes);  // Mount request routes
app.use('/api/auth', authRoutes);  // Mount authentication routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
