const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { MongoClient } = require('mongodb');

// MongoDB URI (connecting to local MongoDB instance)
const uri = "mongodb://localhost:27017/";

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Initialize Socket.IO

// MongoDB insertData function
async function insertData() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("myDB");
        const collection = db.collection("pizzaMenu");

        const pizzas = [
            { name: "Margherita", ingredients: ["tomato", "mozzarella", "basil"], price: 8.99 },
            { name: "Pepperoni", ingredients: ["tomato", "mozzarella", "pepperoni"], price: 9.99 },
            { name: "Veggie Supreme", ingredients: ["tomato", "bell peppers", "onion", "olives"], price: 10.49 }
        ];

        const result = await collection.insertMany(pizzas);
        console.log(`${result.insertedCount} documents inserted:`, result.insertedIds);

        // Emit event to notify clients about the inserted data
        io.emit('dataInserted', { insertedCount: result.insertedCount, insertedIds: result.insertedIds });

    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        await client.close();
    }
}

// MongoDB fetchAllData function
async function fetchAllData() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("myDB");
        const collection = db.collection("pizzaMenu");

        const data = await collection.find().toArray();
        console.log(data);

        // Emit event to notify clients about the fetched data
        io.emit('dataFetched', data);

    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        await client.close();
    }
}

// Set up a basic route for testing
app.get('/', (req, res) => {
    res.send("Socket.IO Server is Running!");
});

// Run the functions (Insert and Fetch data)
insertData();  // Insert some data when the server starts
fetchAllData();  // Fetch all data when the server starts

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
