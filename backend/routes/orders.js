const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const Counter = require('../models/Counter');

// Get next orderId per user (FSD-1, FSD-2, ...)
const getNextOrderId = async (userId) => {
    const counter = await Counter.findByIdAndUpdate(
        `orderId_${userId}`,
        { $inc: { sequence: 1 } },
        { new: true, upsert: true }
    );
    return `FSD-${counter.sequence}`;
};

// @route   GET /api/orders
// @desc    Get all orders for user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: 1 });
        res.json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const orderId = await getNextOrderId(req.user._id);

        const orderData = {
            orderId,
            ...req.body,
            userId: req.user._id
        };

        const order = await Order.create(orderData);
        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/orders/:id
// @desc    Update order
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update fields
        Object.keys(req.body).forEach(key => {
            order[key] = req.body[key];
        });

        await order.save();
        res.json(order);
    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/orders/:id
// @desc    Delete order
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.deleteOne();
        res.json({ message: 'Order deleted', order });
    } catch (error) {
        console.error('Delete order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PATCH /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.patch('/:id/status', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        
        res.json(order);
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
