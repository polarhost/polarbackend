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
    const homepage = await checkStatus('https://polarhost.uk.to');
    const panel = await checkStatus('https://panel.polarhost.uk.to');
    const dashboard = await checkStatus('https://dash.polarhost.uk.to');

    res.json({
        homepage,
        panel,
        dashboard
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
