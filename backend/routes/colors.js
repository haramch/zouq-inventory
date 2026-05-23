const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Color = require('../models/Color');

// @route   GET /api/colors
// @desc    Get all colors for user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const colors = await Color.find({ userId: req.user._id }).sort({ name: 1 });
        res.json(colors);
    } catch (error) {
        console.error('Get colors error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/colors
// @desc    Create new color
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { name, code } = req.body;

        const color = await Color.create({
            name,
            code,
            userId: req.user._id
        });

        res.status(201).json(color);
    } catch (error) {
        console.error('Create color error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/colors/:id
// @desc    Delete color
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const color = await Color.findOne({ _id: req.params.id, userId: req.user._id });

        if (!color) {
            return res.status(404).json({ message: 'Color not found' });
        }

        await color.deleteOne();
        res.json({ message: 'Color deleted' });
    } catch (error) {
        console.error('Delete color error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
