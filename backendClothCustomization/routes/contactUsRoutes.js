const express = require('express');
const router = express.Router();
const db = require('../config/databaseConnection')

router.post('/contact-info', async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        const query = `
            INSERT INTO contact_us (name, phone, email, message)
            VALUES (?, ?, ?, ?)
        `;
        
        await db.execute(query, [name, phone, email, message]);

        res.json({ message: "Submitted Sucessfully." });
    } catch (error) {
        console.error('Error inserting contact information:', error);
        res.status(500).json({ error: 'Error Submitting.' });
    }
});

module.exports=router;