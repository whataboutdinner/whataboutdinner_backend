import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to the Socket.io server
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token') // Send token if available
      }
    });

    // Set up event listeners
    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });

    // Save socket instance to state
    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Join a party room
  const joinParty = (partyId) => {
    if (socket && connected) {
      socket.emit('join-party', partyId);
    }
  };

  // Leave a party room
  const leaveParty = (partyId) => {
    if (socket && connected) {
      socket.emit('leave-party', partyId);
    }
  };

  // Submit a vote
  const submitVote = (data) => {
    if (socket && connected) {
      socket.emit('new-vote', data);
    }
  };

  // Submit an order
  const submitOrder = (data) => {
    if (socket && connected) {
      socket.emit('new-order', data);
    }
  };

  // Update payment status
  const updatePayment = (data) => {
    if (socket && connected) {
      socket.emit('payment-update', data);
    }
  };

  // Announce winning food choice
  const announceWinner = (data) => {
    if (socket && connected) {
      socket.emit('announce-winner', data);
    }
  };

  // Update party status
  const updatePartyStatus = (data) => {
    if (socket && connected) {
      socket.emit('update-party-status', data);
    }
  };

  // Send chat message
  const sendMessage = (data) => {
    if (socket && connected) {
      socket.emit('send-message', data);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        joinParty,
        leaveParty,
        submitVote,
        submitOrder,
        updatePayment,
        announceWinner,
        updatePartyStatus,
        sendMessage
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
