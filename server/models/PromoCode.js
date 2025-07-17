const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: String,
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  maxDiscount: Number,
  minRideAmount: Number,
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  maxUses: { type: Number, default: null },
  currentUses: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PromoCode', PromoCodeSchema);