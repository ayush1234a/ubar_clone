const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 4005;

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join', (data) => {
    // Handle join events
    socket.join(data.userId);
  });

  socket.on('update-location-captain', (data) => {
    // Handle captain location updates
    io.to(data.userId).emit('location-update', data.location);
  });
});

server.listen(PORT, () => {
  console.log(`Socket Service running on port ${PORT}`);
});
