// socketprogramming/app.js
const express = require('express');
const http = require('http');
const socketServer = require('./server/socketServer');  // Import the Socket.IO server setup
const path = require('path');

const app = express();
const server = http.createServer(app);  // Create an HTTP server using Express

// Set up Socket.IO
const io = socketServer(server);

// Set up EJS for views
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the scan form (where user enters URL)
app.get('/', (req, res) => {
    res.render('scanForm');  // Renders the form for the user to input the URL
});

// Start the server on port 3001
const PORT = 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
