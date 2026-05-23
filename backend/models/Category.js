const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true
    },
    sizes: {
        type: [Number],
        required: true,
        default: []
    },
    defaultCost: {
        type: Number,
        required: true,
        default: 0
    },
    defaultSell: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
