// server/index.js

const express = require('express');
const mongoose = require('./database');  // Import database connection
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // For parsing JSON bodies

app.get("/", (req, res) => {
    res.send("Welcome to the backend!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
