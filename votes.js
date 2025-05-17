const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const Party = require('../models/Party');
const auth = require('../middleware/auth');

// @route   POST api/votes
// @desc    Submit a vote for a food choice
// @access  Public (authenticated or guest)
router.post('/', async (req, res) => {
  try {
    const { partyId, userId, userName, foodChoice } = req.body;
    
    if (!partyId || !userName || !foodChoice) {
      return res.status(400).json({ msg: 'Party ID, user name, and food choice are required' });
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
    
    // Check if party is recipe type
    if (party.type !== 'recipe') {
      return res.status(400).json({ msg: 'This party does not support voting' });
    }
    
    // Check if food choice exists in party
    const foodChoiceExists = party.foodChoices.some(choice => choice.name === foodChoice);
    if (!foodChoiceExists) {
      return res.status(400).json({ msg: 'Invalid food choice' });
    }
    
    // Check if user already voted
    const existingVote = await Vote.findOne({ 
      party: partyId,
      $or: [
        { userName: userName },
        ...(userId ? [{ user: userId }] : [])
      ]
    });
    
    if (existingVote) {
      // Update existing vote
      existingVote.foodChoice = foodChoice;
      await existingVote.save();
      
      // Update vote count in party
      await updatePartyVoteCounts(partyId);
      
      return res.json(existingVote);
    }
    
    // Create new vote
    const newVote = new Vote({
      party: partyId,
      userName,
      foodChoice
    });
    
    if (userId) {
      newVote.user = userId;
    }
    
    await newVote.save();
    
    // Update vote count in party
    await updatePartyVoteCounts(partyId);
    
    res.json(newVote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/votes/party/:partyId
// @desc    Get all votes for a party
// @access  Public
router.get('/party/:partyId', async (req, res) => {
  try {
    const votes = await Vote.find({ party: req.params.partyId });
    res.json(votes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/votes/results/:partyId
// @desc    Get vote results for a party
// @access  Public
router.get('/results/:partyId', async (req, res) => {
  try {
    const party = await Party.findById(req.params.partyId);
    
    if (!party) {
      return res.status(404).json({ msg: 'Party not found' });
    }
    
    // Return food choices with vote counts
    res.json(party.foodChoices);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Party not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Helper function to update vote counts in party
async function updatePartyVoteCounts(partyId) {
  try {
    const party = await Party.findById(partyId);
    if (!party) return;
    
    // Get all votes for this party
    const votes = await Vote.find({ party: partyId });
    
    // Reset all vote counts
    party.foodChoices.forEach(choice => {
      choice.votes = 0;
    });
    
    // Count votes for each food choice
    votes.forEach(vote => {
      const foodChoice = party.foodChoices.find(choice => choice.name === vote.foodChoice);
      if (foodChoice) {
        foodChoice.votes += 1;
      }
    });
    
    // Save updated party
    await party.save();
    
    return party;
  } catch (err) {
    console.error('Error updating vote counts:', err);
    throw err;
  }
}

module.exports = router;
