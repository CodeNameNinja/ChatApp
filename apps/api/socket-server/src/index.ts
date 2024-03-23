import express from 'express';
import {createServer} from 'http';
import {Server as SocketIOServer} from 'socket.io';
import ChatHandler from "@handlers/ChatHandler"
import connectToDatabase from './config/database';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

// Connect to MongoDB
connectToDatabase();


io.on('connection', (socket) => {
    console.log('A user connected');
    const defaultRoom = 'mainRoom';
    socket.join(defaultRoom);


    socket.on('disconnect', () => {
        console.log('User disconnected');
        socket.leave(defaultRoom)
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
