// pieChartRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('../config/MySql');

// api/v1/pie-chart
router.get('/pie-chart', (req, res) => {
    try {
        const selectedMonth = req.query.month ? parseInt(req.query.month) : new Date().getMonth() + 1;

        connection.query('SELECT category, COUNT(*) AS itemCount FROM transactions WHERE MONTH(dateOfSale) = ? GROUP BY category', [selectedMonth], (err, results) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const responseData = results.map(row => ({
                category: row.category,
                count: row.itemCount
            }));

            res.status(200).json(responseData);
        });
    } catch (error) {
        console.error('Error generating pie chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
