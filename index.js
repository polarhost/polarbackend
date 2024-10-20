const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

const checkStatus = async () => {
    let statusUpdates = {
        homepage: { status: false },
        panel: { status: false },
        dashboard: { status: false }
    };
    const homepageUrl = 'https://polarhost.uk.to';
    const panelUrl = 'https://panel.polarhost.uk.to';
    const dashboardUrl = 'https://dash.polarhost.uk.to';
    try {
        const homepageResponse = await axios.get(homepageUrl);
        statusUpdates.homepage.status = homepageResponse.status === 200;
    } catch {
        statusUpdates.homepage.status = false;
    }
    try {
        const panelResponse = await axios.get(panelUrl);
        statusUpdates.panel.status = panelResponse.status === 200;
    } catch {
        statusUpdates.panel.status = false;
    }
    try {
        const dashboardResponse = await axios.get(dashboardUrl);
        statusUpdates.dashboard.status = dashboardResponse.status === 200;
    } catch {
        statusUpdates.dashboard.status = false;
    }
    return statusUpdates;
};

const emitStatusUpdates = async () => {
    const statusUpdates = await checkStatus();
    io.emit('statusUpdate', statusUpdates);
};

setInterval(emitStatusUpdates, 5000);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
