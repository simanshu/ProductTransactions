// barChartRoutes.js
const express = require('express');
const router = express.Router();
const connection = require('../config/MySql');

// api/v1/bar-chart
router.get('/bar-chart', (req, res) => {
    try {
        const selectedMonth = req.query.month ? parseInt(req.query.month) : new Date().getMonth() + 1;
        connection.query('SELECT * FROM transactions WHERE MONTH(dateOfSale) = ?', [selectedMonth], (err, results) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            const priceRanges = [
                { min: 0, max: 100 },
                { min: 101, max: 200 },
                { min: 201, max: 300 },
                { min: 301, max: 400 },
                { min: 401, max: 500 },
                { min: 501, max: 600 },
                { min: 601, max: 700 },
                { min: 701, max: 800 },
                { min: 801, max: 900 },
                { min: 901, max: Infinity }
            ];
            const rangeCounts = Array(priceRanges.length).fill(0);
            results.forEach(transaction => {
                const price = transaction.price;
                for (let i = 0; i < priceRanges.length; i++) {
                    if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
                        rangeCounts[i]++;
                        break;
                    }
                }
            });
            const responseData = priceRanges.map((range, index) => ({
                range: `${range.min}-${range.max}`,
                count: rangeCounts[index]
            }));

            res.status(200).json(responseData);
        });
    } catch (error) {
        console.error('Error generating bar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
