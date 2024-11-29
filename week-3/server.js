// Import the express module
const express = require('express');

// Create an Express app
const app = express();

// Define a port for the server to listen on
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// A basic GET route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Another route with a parameter
app.get('/greet/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

// A POST route to handle JSON data
app.post('/submit', (req, res) => {
  const data = req.body;
  res.json({
    message: 'Data received successfully',
    data: data,
  });
});

// A route for handling 404 (Not Found)
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
