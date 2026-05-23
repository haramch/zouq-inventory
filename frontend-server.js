const express = require('express');
const path = require('path');

const app = express();

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3000, () => {
    console.log('\n📱 Frontend server running on port 3000');
    console.log('🌐 Open: http://localhost:3000/index.html\n');
});
