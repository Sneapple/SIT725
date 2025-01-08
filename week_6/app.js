// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const scannerController = require('./controllers/scannerController');

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Use the scanner controller for routes
app.use(scannerController);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; // Export app for testing
