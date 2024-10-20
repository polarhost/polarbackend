const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const checkStatus = async (url) => {
    try {
        const response = await fetch(url);
        return response.ok ? 'OK' : 'DOWN';
    } catch {
        return 'DOWN';
    }
};

app.get('/api/status', async (req, res) => {
    const homepage = await checkStatus('https://polarhost.uk.to'); // Replace with your GitHub Pages URL
    const panel = await checkStatus('https://panel.polarhost.uk.to'); // Replace with your panel URL
    const dashboard = await checkStatus('https://dash.polarhost.uk.to'); // Replace with your dashboard URL

    res.json({ homepage, panel, dashboard });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
