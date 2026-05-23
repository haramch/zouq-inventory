const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Category = require('../models/Category');

// @route   GET /api/categories
// @desc    Get all categories for user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user._id }).sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/categories
// @desc    Create new category
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { name, sizes, defaultCost, defaultSell } = req.body;

        const category = await Category.create({
            name,
            sizes,
            defaultCost,
            defaultSell,
            userId: req.user._id
        });

        res.status(201).json(category);
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, userId: req.user._id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const { name, sizes, defaultCost, defaultSell } = req.body;
        
        category.name = name || category.name;
        category.sizes = sizes || category.sizes;
        category.defaultCost = defaultCost !== undefined ? defaultCost : category.defaultCost;
        category.defaultSell = defaultSell !== undefined ? defaultSell : category.defaultSell;

        await category.save();
        res.json(category);
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, userId: req.user._id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.deleteOne();
        res.json({ message: 'Category deleted' });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
