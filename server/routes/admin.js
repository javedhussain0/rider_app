const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const User = require('../models/User');
const Rider = require('../models/Rider');
const Ride = require('../models/Ride');
const Payment = require('../models/Payment');
const PromoCode = require('../models/PromoCode');

// Apply auth and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Get dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalRiders = await User.countDocuments({ role: 'rider' });
    const activeRides = await Ride.countDocuments({ status: { $in: ['accepted', 'arrived', 'in_progress'] } });
    const completedRides = await Ride.countDocuments({ status: 'completed' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$commission' } } }
    ]);
    
    const recentRides = await Ride.find()
      .sort({ requestedAt: -1 })
      .limit(10)
      .populate('user', 'firstName lastName')
      .populate('rider', 'userId')
      .exec();
    
    res.json({
      totalUsers,
      totalRiders,
      activeRides,
      completedRides,
      totalRevenue: totalRevenue.length ? totalRevenue[0].total : 0,
      recentRides
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

// Manage users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Manage riders
router.get('/riders', async (req, res) => {
  try {
    const riders = await Rider.find()
      .populate('userId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
    res.json(riders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch riders' });
  }
});

// Verify rider documents
router.put('/riders/:id/verify', async (req, res) => {
  try {
    const rider = await Rider.findByIdAndUpdate(
      req.params.id,
      { $set: { 'documents.$[elem].verified': true } },
      { 
        arrayFilters: [{ 'elem.verified': false }],
        new: true
      }
    );
    
    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }
    
    res.json(rider);
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify documents' });
  }
});

// Create promo code
router.post('/promos', async (req, res) => {
  try {
    const promo = new PromoCode({
      ...req.body,
      createdBy: req.user.userId
    });
    
    await promo.save();
    res.status(201).json(promo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create promo code' });
  }
});

module.exports = router;