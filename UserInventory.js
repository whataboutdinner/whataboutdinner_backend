import mongoose from 'mongoose';

const UserInventorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String
    },
    unit: {
      type: String
    },
    expiryDate: {
      type: Date
    }
  }],
  cookingVessels: [{
    name: {
      type: String,
      required: true
    },
    notes: {
      type: String
    }
  }],
  preferredGroceryStores: [{
    name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  preferredDeliveryService: {
    type: String,
    enum: ['DoorDash', 'Uber Eats', 'Other'],
    default: 'DoorDash'
  }
}, {
  timestamps: true
});

// Create a compound index for efficient queries
UserInventorySchema.index({ userId: 1 });

export default mongoose.models.UserInventory || mongoose.model('UserInventory', UserInventorySchema);
