// transactionRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('../config/MySql');

// api/v1/transactions
router.get('/transactions', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;
    const search = req.query.search ? req.query.search.toLowerCase() : '';

    connection.query('SELECT * FROM transactions', (err, results) => {
        if (err) {
            console.error('Error fetching transactions:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        try {
            const filteredTransactions = results.filter(transaction => {
                return transaction.title.toLowerCase().includes(search) ||
                    transaction.description.toLowerCase().includes(search) ||
                    transaction.price.toString().includes(search);
            });

            const paginatedTransactions = filteredTransactions.slice(offset, offset + perPage);

            res.status(200).json({ transactions: paginatedTransactions });
        } catch (error) {
            console.error('Error listing transactions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

module.exports = router;
