import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const serverUrl = import.meta.env.VITE_BASE_URL;
console.log('Socket.IO server URL:', serverUrl);

const socket = io(serverUrl, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
});

const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
            setError(null);
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
            setError(`Failed to connect to server: ${err.message}`);
            setIsConnected(false);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected, error }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;