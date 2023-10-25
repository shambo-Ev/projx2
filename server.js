const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // Import the 'path' module
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

app.get('/jsondata', (req, res) => {
    try {
        const jsonDataPath = path.join(__dirname, 'package.json'); // Construct the path to package.json
        const jsonData = fs.readFileSync(jsonDataPath, 'utf8');
        const parsedData = JSON.parse(jsonData);

        // Access the 'myUrl' property from package.json
        const myUrl = parsedData.myUrl;

        if (myUrl) {
            res.send(myUrl);
        } else {
            res.status(500).send('No URL found in package.json');
        }
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        res.status(500).send('Error fetching JSON data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
