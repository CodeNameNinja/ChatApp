import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import ChatHandler from "@handlers/ChatHandler"

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    new ChatHandler(io, socket);
    // Handle chat message
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
