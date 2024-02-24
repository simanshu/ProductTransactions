// combinedDataRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/combined-data
// Fetch data from all three APIs, combine the responses, and send a final response with the combined JSON
router.get('/combined-data', (req, res) => {
    // URLs for the three APIs
    const initializeURL = 'http://localhost:8090/api/v1/initialize';
    const transactionsURL = 'http://localhost:8090/api/v1/transactions';
    const pieChartURL = 'http://localhost:8090/api/v1/pie-chart';

    // Fetch data from the initialize API
    axios.get(initializeURL)
        .then(initializeResponse => {
            const initializeData = initializeResponse.data;

            // Fetch data from the transactions API
            return axios.get(transactionsURL)
                .then(transactionsResponse => {
                    const transactionsData = transactionsResponse.data;

                    // Fetch data from the pie-chart API
                    return axios.get(pieChartURL)
                        .then(pieChartResponse => {
                            const pieChartData = pieChartResponse.data;

                            // Combine the responses into a single JSON object
                            const combinedData = {
                                initializeData,
                                transactionsData,
                                pieChartData
                            };

                            res.status(200).json(combinedData);
                        });
                });
        })
        .catch(error => {
            console.error('Error fetching combined data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;
