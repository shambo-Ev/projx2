const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/proxy', async (req, res) => {
    const targetURL = 'https://www.tradingview.com/chart/i8hOgkM4/?symbol=OANDA%3AXAUUSD';

    try {
        const response = await axios.get(targetURL);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the content');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
