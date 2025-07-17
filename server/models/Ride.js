const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
  pickupLocation: {
    address: String,
    coordinates: { type: [Number], required: true }
  },
  dropoffLocation: {
    address: String,
    coordinates: { type: [Number], required: true }
  },
  rideType: { type: String, enum: ['standard', 'premium', 'pool'], required: true },
  status: { 
    type: String, 
    enum: ['requested', 'accepted', 'arrived', 'in_progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  requestedAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  startedAt: Date,
  completedAt: Date,
  distance: { type: Number }, // in kilometers
  duration: { type: Number }, // in minutes
  fare: { type: Number },
  paymentMethod: { type: String, enum: ['cash', 'card', 'wallet'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  userRating: { type: Number, min: 1, max: 5 },
  riderRating: { type: Number, min: 1, max: 5 },
  feedback: String,
  promoCode: { type: mongoose.Schema.Types.ObjectId, ref: 'PromoCode' },
  discountAmount: { type: Number, default: 0 }
});

RideSchema.index({ pickupLocation: '2dsphere' });
RideSchema.index({ dropoffLocation: '2dsphere' });

module.exports = mongoose.model('Ride', RideSchema);