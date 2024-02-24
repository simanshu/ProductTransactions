// statisticsRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('../config/MySql');

// api/v1/statistics

router.get('/statistics', (req, res) => {
    try {
        //current month
        const currentMonth = new Date().getMonth() + 1;
        const selectedMonth = req.query.month ? parseInt(req.query.month) : currentMonth;

        connection.query('SELECT * FROM transactions', (err, results) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const transactionsForSelectedMonth = results.filter(transaction => {
                const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
                return transactionMonth === selectedMonth;
            });

            let totalSaleAmount = 0;
            let totalSoldItems = 0;
            let totalNotSoldItems = 0;

            transactionsForSelectedMonth.forEach(transaction => {
                if (transaction.sold) {
                    totalSaleAmount += transaction.price;
                    totalSoldItems += 1;
                } else {
                    totalNotSoldItems += 1;
                }
            });

            res.status(200).json({
                totalSaleAmount,
                totalSoldItems,
                totalNotSoldItems
            });
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
