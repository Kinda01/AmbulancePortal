// Import necessary modules
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// User registration function
exports.registerUser = async (request, response) => {
    const { firstName, lastName, email, password } = request.body;
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email_address = ?', [email]);
        if (rows.length > 0) {
            return response.status(400).json({ message: 'User already exists!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert record into db table
        await db.execute('INSERT INTO users (first_name, last_name, email_address, password) VALUES (?,?,?,?)', [
            firstName,
            lastName,
            email,
            hashedPassword
        ]);
        response.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        response.status(500).json({ message: 'An error occurred!', error });
    }
};

// User login function
exports.loginUser = async (request, response) => {
    const { email, password } = request.body;
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return response.status(400).json({ message: 'User not found! Please register.' });
        }
        const user = rows[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Invalid credentials!' });
        }
        response.status(200).json({ message: 'Login successful!', messageStatus: '200' });
    } catch (error) {
        response.status(500).json({ message: 'An error occurred!', error });
    }
};

// Forgot password function
exports.forgotPassword = async (request, response) => {
    const { email } = request.body;
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return response.status(400).json({ message: 'User not found! Please register.' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Store hashed reset token in the database
        await db.execute('UPDATE users SET reset_token = ? WHERE email = ?', [resetTokenHash, email]);

        // Send reset link to user's email
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click this link to reset your password: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);

        response.status(200).json({ message: 'Password reset link sent to your email!' });
    } catch (error) {
        response.status(500).json({ message: 'An error occurred!', error });
    }
};

// Reset password function
exports.resetPassword = async (request, response) => {
    const { token, newPassword } = request.body;
    try {
        // Hash the token to match the one stored in the database
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user by reset token
        const [rows] = await db.execute('SELECT * FROM users WHERE reset_token = ?', [hashedToken]);
        if (rows.length === 0) {
            return response.status(400).json({ message: 'Invalid or expired reset token!' });
        }
        const user = rows[0];

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token
        await db.execute('UPDATE users SET password = ?, reset_token = NULL WHERE id = ?', [hashedPassword, user.id]);

        response.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
        response.status(500).json({ message: 'An error occurred!', error });
    }
};
