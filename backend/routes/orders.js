const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');
const { loadMockData } = require('../utils/mockLoader');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to optionally get user from token
const getOptionalUser = async (req) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
            return await User.findById(decoded.id).select('-password');
        } catch (error) {
            return null;
        }
    }
    return null;
};

// Create new order (Guest or Logged in)
router.post('/', async (req, res) => {
    const { items, totalAmount, customerName, phoneNumber, address, details } = req.body;
    
    try {
        const user = await getOptionalUser(req);
        const orderNumber = 'SS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        const order = await Order.create({
            user: user ? user._id : null,
            orderNumber,
            customerName,
            phoneNumber,
            address,
            details,
            items,
            totalAmount
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Track order by number (Public)
router.get('/track/:orderNumber', async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber.toUpperCase() })
            .populate('items.product', 'name price image');
        
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user orders
router.get('/myorders', protect, async (req, res) => {
    if (process.env.USE_MOCK_DATA === 'true') {
        return res.json(loadMockData('orders'));
    }
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all orders (Admin)
router.get('/', protect, admin, async (req, res) => {
    if (process.env.USE_MOCK_DATA === 'true') {
        return res.json(loadMockData('orders'));
    }
    try {
        const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status (Admin)
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
