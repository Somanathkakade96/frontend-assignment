// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

//app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
 //   res.sendStatus(200);
//});
app.post('/api/fetchStockData', async (req, res) => {
    try {
        const { stockSymbol, date } = req.body;
        if (!stockSymbol || !date) {
            return res.status(400).json({ error: 'Stock symbol and date are required.' });
        }

        // Replace 'YOUR_POLYGON_API_KEY' with your actual Polygon API key
        const apiKey = process.env.POLYGON_API_KEY || 'U72FzB4CBTd0ZSoTRA8hkSrZEteNVIeD';
        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${date}/${date}?apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.results && response.data.results.length > 0) {
            const tradeStats = response.data.results[0];
            const { o, h, l, c, v } = tradeStats;
            res.status(200).json({ open: o, high: h, low: l, close: c, volume: v });
        } else {
            res.status(404).json({ error: 'Trade data not found for the given stock and date.' });
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));