const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  partyCode: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['recipe', 'restaurant'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  foodChoices: [{
    name: String,
    description: String,
    votes: {
      type: Number,
      default: 0
    }
  }],
  restaurant: {
    name: String,
    description: String,
    menuItems: [{
      name: String,
      description: String,
      price: Number
    }]
  },
  winningChoice: {
    name: String,
    description: String,
    recipe: {
      ingredients: [String],
      instructions: [String],
      prepTime: String,
      cookTime: String
    }
  },
  participants: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    vote: String,
    order: {
      items: [{
        name: String,
        price: Number,
        specialInstructions: String
      }],
      totalAmount: Number,
      paid: {
        type: Boolean,
        default: false
      }
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
});

// Generate a random 6-digit party code
PartySchema.statics.generatePartyCode = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = mongoose.model('Party', PartySchema);
