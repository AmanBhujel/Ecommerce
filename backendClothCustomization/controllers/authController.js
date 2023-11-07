const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/databaseConnection');
require('dotenv').config();

//sign up the user
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [existingUsers] = await db.execute(
            `
            SELECT * FROM users WHERE email = ?
            `,
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            `
            INSERT INTO users (name, email, password) 
            VALUES (?, ?, ?)
            `,
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'Signed up successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

//logging in the user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [result] = await db.execute(
            `
            SELECT * FROM users WHERE email = ?
            `,
            [email]
        );
        if (result.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_TOKEN_KEY);
                res.status(200).json({ message: 'Login successful', token: token });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { signUp, login };
