const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');
const { loadMockData } = require('../utils/mockLoader');

// Create new order
router.post('/', protect, async (req, res) => {
    if (process.env.USE_MOCK_DATA === 'true') {
        return res.status(201).json({ message: 'Order created (Mock Mode)', orderId: 'MOCK-123' });
    }
    const { items, totalAmount, shippingAddress } = req.body;
    try {
        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress
        });
        res.status(201).json(order);
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
