const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Party = require('../models/Party');
const auth = require('../middleware/auth');

// @route   POST api/orders
// @desc    Submit an order for a restaurant party
// @access  Public (authenticated or guest)
router.post('/', async (req, res) => {
  try {
    const { partyId, userId, userName, items, totalAmount } = req.body;
    
    if (!partyId || !userName || !items || !totalAmount) {
      return res.status(400).json({ msg: 'Party ID, user name, items, and total amount are required' });
    }
    
    // Check if party exists
    const party = await Party.findById(partyId);
    if (!party) {
      return res.status(404).json({ msg: 'Party not found' });
    }
    
    // Check if party is active
    if (party.status !== 'active') {
      return res.status(400).json({ msg: 'This party is no longer active' });
    }
    
    // Check if party is restaurant type
    if (party.type !== 'restaurant') {
      return res.status(400).json({ msg: 'This party does not support restaurant orders' });
    }
    
    // Check if user already placed an order
    const existingOrder = await Order.findOne({ 
      party: partyId,
      $or: [
        { userName: userName },
        ...(userId ? [{ user: userId }] : [])
      ]
    });
    
    if (existingOrder) {
      // Update existing order
      existingOrder.items = items;
      existingOrder.totalAmount = totalAmount;
      await existingOrder.save();
      
      // Update order in party participants
      await updatePartyParticipantOrder(partyId, userName, userId, items, totalAmount);
      
      return res.json(existingOrder);
    }
    
    // Create new order
    const newOrder = new Order({
      party: partyId,
      userName,
      items,
      totalAmount
    });
    
    if (userId) {
      newOrder.user = userId;
    }
    
    await newOrder.save();
    
    // Update order in party participants
    await updatePartyParticipantOrder(partyId, userName, userId, items, totalAmount);
    
    res.json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/orders/party/:partyId
// @desc    Get all orders for a party
// @access  Public
router.get('/party/:partyId', async (req, res) => {
  try {
    const orders = await Order.find({ party: req.params.partyId });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/orders/:id/payment
// @desc    Update payment status for an order
// @access  Public
router.put('/:id/payment', async (req, res) => {
  try {
    const { paid, paymentMethod } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    
    // Update payment status
    order.paid = paid;
    if (paymentMethod) {
      order.paymentMethod = paymentMethod;
    }
    
    await order.save();
    
    // Update payment status in party participant
    await updatePartyParticipantPayment(order.party, order.userName, order.user, paid);
    
    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Helper function to update order in party participant
async function updatePartyParticipantOrder(partyId, userName, userId, items, totalAmount) {
  try {
    const party = await Party.findById(partyId);
    if (!party) return;
    
    // Find participant
    const participantIndex = party.participants.findIndex(p => 
      (userId && p.user && p.user.toString() === userId) || 
      (!userId && p.name === userName)
    );
    
    if (participantIndex === -1) {
      // Add as new participant if not found
      const newParticipant = {
        name: userName,
        joinedAt: Date.now(),
        order: {
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            specialInstructions: item.specialInstructions
          })),
          totalAmount,
          paid: false
        }
      };
      
      if (userId) {
        newParticipant.user = userId;
      }
      
      party.participants.push(newParticipant);
    } else {
      // Update existing participant
      party.participants[participantIndex].order = {
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          specialInstructions: item.specialInstructions
        })),
        totalAmount,
        paid: party.participants[participantIndex].order ? 
              party.participants[participantIndex].order.paid : false
      };
    }
    
    // Save updated party
    await party.save();
    
    return party;
  } catch (err) {
    console.error('Error updating participant order:', err);
    throw err;
  }
}

// Helper function to update payment status in party participant
async function updatePartyParticipantPayment(partyId, userName, userId, paid) {
  try {
    const party = await Party.findById(partyId);
    if (!party) return;
    
    // Find participant
    const participantIndex = party.participants.findIndex(p => 
      (userId && p.user && p.user.toString() === userId) || 
      (!userId && p.name === userName)
    );
    
    if (participantIndex !== -1 && party.participants[participantIndex].order) {
      // Update payment status
      party.participants[participantIndex].order.paid = paid;
      
      // Save updated party
      await party.save();
    }
    
    return party;
  } catch (err) {
    console.error('Error updating participant payment:', err);
    throw err;
  }
}

module.exports = router;
