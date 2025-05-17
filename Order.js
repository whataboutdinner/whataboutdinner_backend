const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  party: {
    type: Schema.Types.ObjectId,
    ref: 'Party',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    specialInstructions: {
      type: String
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'venmo', 'paypal', 'other'],
    default: 'cash'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
