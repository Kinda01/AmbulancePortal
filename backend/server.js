const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const requestRoutes = require('./routes/requestRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config({ path: './config/.env' });

const app = express();

// Serve static files from the 'build' folder created by React
app.use(express.static(path.join(__dirname, 'build')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
    key: 'session_cookie_name',
    secret: '235262627wywwowy',
    store: new MySQLStore({}, mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '@2002Mysql#',
        database: 'ambulance_portal'
    })),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

// API Routes
app.use('/auth', authRoutes);
app.use('/api/requests', requestRoutes);

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
