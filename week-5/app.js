// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const scannerController = require('./controllers/scannerController');

const app = express();

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the controller
app.use(scannerController);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
