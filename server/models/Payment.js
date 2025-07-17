const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
  ref: "User", required: true },
  rider: { type: mongoose.Schema.Types.ObjectId, 
    ref: "Rider" 
},
  ride: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Ride", 
    required: true 
},
  amount: {
     type: Number, 
     required: true 
    },
  commission: { type: Number,
     required: true 
    },
  riderEarnings: {
     type: Number, 
     required: true 
    },
  paymentMethod: { 
    type: String, 
    required: true 
},
  transactionId: { 
    type: String,
     required: true 
    },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
},
  completedAt: Date,
});

module.exports = mongoose.model("Payment", PaymentSchema);
