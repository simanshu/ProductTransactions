// initializeRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const connection = require('../config/MySql');
// api/v1/initialize
router.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        if (!Array.isArray(transactions)) {
            throw new Error('Data fetched is not an array');
        }

        const sql = 'INSERT INTO transactions (title, price, description, category, image, sold, dateOfSale) VALUES ?';
        const values = transactions.map(transaction => {
            if (!transaction.title || typeof transaction.title !== 'string') {
                throw new Error('Invalid data format: missing title or title is not a string');
            }

            return [
                transaction.title,
                transaction.price,
                transaction.description || '', 
                transaction.category || '',    
                transaction.image || '',       
                transaction.sold || false,     
                transaction.dateOfSale
            ];
        });

        connection.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error initializing database:', err);
                throw err;
            }
           
            res.status(200).json({ message: 'Database initialized successfully with seed data' });
        });
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
