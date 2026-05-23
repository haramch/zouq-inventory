const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Inventory = require('../models/Inventory');

// @route   GET /api/inventory
// @desc    Get all inventory items for user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const items = await Inventory.find({ userId: req.user._id }).sort({ category: 1, size: 1 });
        res.json(items);
    } catch (error) {
        console.error('Get inventory error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/inventory
// @desc    Create or update inventory item
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { category, size, color, stock, costPrice, sellingPrice, dateAdded } = req.body;

        // Find existing item
        let item = await Inventory.findOne({
            category,
            size,
            color,
            userId: req.user._id
        });

        if (item) {
            // Update existing
            item.stock = stock;
            item.costPrice = costPrice;
            item.sellingPrice = sellingPrice;
            if (dateAdded) item.dateAdded = dateAdded;
            await item.save();
        } else {
            // Create new
            item = await Inventory.create({
                category,
                size,
                color,
                stock,
                costPrice,
                sellingPrice,
                dateAdded: dateAdded || Date.now(),
                userId: req.user._id
            });
        }

        res.json(item);
    } catch (error) {
        console.error('Create/Update inventory error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/inventory/:id
// @desc    Update inventory item
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const item = await Inventory.findOne({ _id: req.params.id, userId: req.user._id });

        if (!item) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        const { stock, costPrice, sellingPrice, dateAdded } = req.body;

        item.stock = stock !== undefined ? stock : item.stock;
        item.costPrice = costPrice !== undefined ? costPrice : item.costPrice;
        item.sellingPrice = sellingPrice !== undefined ? sellingPrice : item.sellingPrice;
        if (dateAdded) item.dateAdded = dateAdded;

        await item.save();
        res.json(item);
    } catch (error) {
        console.error('Update inventory error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/inventory/:id
// @desc    Delete inventory item
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const item = await Inventory.findOne({ _id: req.params.id, userId: req.user._id });

        if (!item) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        await item.deleteOne();
        res.json({ message: 'Inventory item deleted' });
    } catch (error) {
        console.error('Delete inventory error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
