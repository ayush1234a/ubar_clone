const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            try {
                if (userType === 'user') {
                    const user = await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    if (!user) {
                        return socket.emit('error', { message: 'User not found' });
                    }
                } else if (userType === 'captain') {
                    const captain = await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    if (!captain) {
                        return socket.emit('error', { message: 'Captain not found' });
                    }
                }
            } catch (error) {
                console.error('Join error:', error);
                socket.emit('error', { message: 'Internal server error' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            try {
                const updated = await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        lat: location.lat,
                        lng: location.lng
                    }
                });

                if (!updated) {
                    return socket.emit('error', { message: 'Captain not found' });
                }

                console.log(`Location updated for captain ${userId}:`, location);
            } catch (error) {
                console.error('Location update error:', error);
                socket.emit('error', { message: 'Internal server error' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log('Sending message:', messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

module.exports = { initializeSocket, sendMessageToSocketId };
