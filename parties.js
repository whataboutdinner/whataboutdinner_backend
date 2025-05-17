const express = require('express');
const router = express.Router();
const Party = require('../models/Party');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST api/parties
// @desc    Create a new party
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, foodChoices, restaurant } = req.body;
    
    // Generate a unique 6-digit party code
    let partyCode;
    let isUnique = false;
    
    while (!isUnique) {
      partyCode = Party.generatePartyCode();
      const existingParty = await Party.findOne({ partyCode });
      if (!existingParty) {
        isUnique = true;
      }
    }
    
    // Create new party
    const newParty = new Party({
      name,
      host: req.user.id,
      partyCode,
      type,
      status: 'active',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Expires in 24 hours
    });
    
    // Add food choices if it's a recipe voting party
    if (type === 'recipe' && foodChoices && foodChoices.length > 0) {
      newParty.foodChoices = foodChoices.map(choice => ({
        name: choice.name,
        description: choice.description || '',
        votes: 0
      }));
    }
    
    // Add restaurant details if it's a restaurant order party
    if (type === 'restaurant' && restaurant) {
      newParty.restaurant = {
        name: restaurant.name,
        description: restaurant.description || '',
        menuItems: restaurant.menuItems || []
      };
    }
    
    // Save party to database
    const party = await newParty.save();
    
    res.json(party);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/parties
// @desc    Get all parties hosted by the user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const parties = await Party.find({ host: req.user.id }).sort({ createdAt: -1 });
    res.json(parties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/parties/:id
// @desc    Get party by ID
// @access  Public (to allow participants to join)
router.get('/:id', async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ msg: 'Party not found' });
    }
    
    res.json(party);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Party not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/parties/code/:partyCode
// @desc    Get party by party code
// @access  Public (to allow participants to join)
router.get('/code/:partyCode', async (req, res) => {
  try {
    const party = await Party.findOne({ partyCode: req.params.partyCode });
    
    if (!party) {
      return res.status(404).json({ msg: 'Party not found' });
    }
    
    res.json(party);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/parties/:id
// @desc    Update a party
// @access  Private (only host can update)
router.put('/:id', auth, async (req, res) => {
  try {
    let party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ msg: 'Party not found' });
    }
    
    // Check if user is the host
    if (party.host.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this party' });
    }
    
    const { name, status, foodChoices, restaurant, winningChoice } = req.body;
    
    // Update fields
    if (name) party.name = name;
    if (status) party.status = status;
    if (foodChoices) party.foodChoices = foodChoices;
    if (restaurant) party.restaurant = restaurant;
    if (winningChoice) party.winningChoice = winningChoice;
    
    await party.save();
    
    res.json(party);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Party not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/parties/:id/join
// @desc    Join a party as a participant
// @access  Public (authenticated or guest)
router.post('/:id/join', async (req, res) => {
  try {
    const { name, userId } = req.body;
    
    if (!name) {
      return res.status(400).json({ msg: 'Name is required' });
    }
    
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ msg: 'Party not found' });
    }
    
    // Check if party is active
    if (party.status !== 'active') {
      return res.status(400).json({ msg: 'This party is no longer active' });
    }
    
    // Check if user is already a participant
    const existingParticipant = party.participants.find(
      p => (userId && p.user && p.user.toString() === userId) || 
           (!userId && p.name === name)
    );
    
    if (existingParticipant) {
      return res.status(400).json({ msg: 'You are already a participant in this party' });
    }
    
    // Add user as participant
    const newParticipant = {
      name,
      joinedAt: Date.now()
    };
    
    if (userId) {
      newParticipant.user = userId;
    }
    
    party.participants.push(newParticipant);
    await party.save();
    
    res.json(party);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Party not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/parties/:id
// @desc    Delete a party
// @access  Private (only host can delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ msg: 'Party not found' });
    }
    
    // Check if user is the host
    if (party.host.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this party' });
    }
    
    await party.remove();
    
    res.json({ msg: 'Party removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Party not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
