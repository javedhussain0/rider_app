const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  licenseNumber: { type: String, required: true },
  vehicleType: { type: String, enum: ['bike', 'car', 'premium', 'xl'], required: true },
  vehicleModel: { type: String, required: true },
  vehicleYear: { type: Number, required: true },
  vehicleColor: { type: String, required: true },
  licensePlate: { type: String, required: true },
  documents: [{
    type: { type: String, enum: ['license', 'registration', 'insurance'] },
    url: String,
    verified: { type: Boolean, default: false }
  }],
  isOnline: { type: Boolean, default: false },
  currentLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  rating: { type: Number, default: 0 },
  totalRides: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true }
});

RiderSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Rider', RiderSchema);