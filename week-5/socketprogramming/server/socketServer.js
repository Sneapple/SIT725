// socketprogramming/server/socketServer.js
const socketIo = require('socket.io');

function setupSocketServer(server) {
    const io = socketIo(server);  // Initialize socket.io on the server

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Example event: When a "scan-request" is received from the client
        socket.on('scan-request', (data) => {
            console.log('Scan request for URL:', data.url);
            // Send a scan result back to the client
            socket.emit('scan-result', { result: 'Scan completed for ' + data.url });
        });

        // Handle disconnections
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
}

module.exports = setupSocketServer;
