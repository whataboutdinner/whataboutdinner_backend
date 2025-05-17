// Socket.io service for real-time communication
const socketService = (io) => {
  // Middleware for authentication (optional)
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    // If token exists, verify it
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded.user;
      } catch (err) {
        // Invalid token, but still allow connection
        console.log('Invalid token in socket connection');
      }
    }
    
    // Allow connection regardless of authentication
    next();
  });

  // Connection event
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Join a party room
    socket.on('join-party', (partyId) => {
      socket.join(partyId);
      console.log(`Socket ${socket.id} joined party: ${partyId}`);
      
      // Notify others in the room
      socket.to(partyId).emit('user-joined', {
        userName: socket.user ? socket.user.name : 'Guest',
        userId: socket.user ? socket.user.id : null,
        timestamp: new Date()
      });
    });
    
    // Leave a party room
    socket.on('leave-party', (partyId) => {
      socket.leave(partyId);
      console.log(`Socket ${socket.id} left party: ${partyId}`);
      
      // Notify others in the room
      socket.to(partyId).emit('user-left', {
        userName: socket.user ? socket.user.name : 'Guest',
        userId: socket.user ? socket.user.id : null,
        timestamp: new Date()
      });
    });
    
    // New vote submitted
    socket.on('new-vote', (data) => {
      console.log(`New vote in party ${data.partyId} for ${data.foodChoice}`);
      
      // Broadcast to everyone in the room except sender
      socket.to(data.partyId).emit('vote-update', {
        userName: data.userName,
        userId: data.userId,
        foodChoice: data.foodChoice,
        timestamp: new Date()
      });
    });
    
    // New order submitted
    socket.on('new-order', (data) => {
      console.log(`New order in party ${data.partyId} for ${data.items.length} items`);
      
      // Broadcast to everyone in the room except sender
      socket.to(data.partyId).emit('order-update', {
        userName: data.userName,
        userId: data.userId,
        items: data.items,
        totalAmount: data.totalAmount,
        timestamp: new Date()
      });
    });
    
    // Payment status update
    socket.on('payment-update', (data) => {
      console.log(`Payment update in party ${data.partyId} for user ${data.userName}`);
      
      // Broadcast to everyone in the room
      io.to(data.partyId).emit('payment-status', {
        userName: data.userName,
        userId: data.userId,
        paid: data.paid,
        paymentMethod: data.paymentMethod,
        timestamp: new Date()
      });
    });
    
    // Host announces winning food choice
    socket.on('announce-winner', (data) => {
      console.log(`Winner announced in party ${data.partyId}: ${data.winningChoice}`);
      
      // Broadcast to everyone in the room
      io.to(data.partyId).emit('winner-announced', {
        winningChoice: data.winningChoice,
        recipe: data.recipe,
        timestamp: new Date()
      });
    });
    
    // Host updates party status
    socket.on('update-party-status', (data) => {
      console.log(`Party ${data.partyId} status updated to ${data.status}`);
      
      // Broadcast to everyone in the room
      io.to(data.partyId).emit('party-status-update', {
        status: data.status,
        message: data.message,
        timestamp: new Date()
      });
    });
    
    // Chat message
    socket.on('send-message', (data) => {
      console.log(`New message in party ${data.partyId} from ${data.userName}`);
      
      // Broadcast to everyone in the room including sender
      io.to(data.partyId).emit('new-message', {
        userName: data.userName,
        userId: data.userId,
        message: data.message,
        timestamp: new Date()
      });
    });
    
    // Disconnect event
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = socketService;
