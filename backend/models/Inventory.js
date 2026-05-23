const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    size: {
        type: String,
        required: [true, 'Size is required'],
        trim: true
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    costPrice: {
        type: Number,
        required: true,
        default: 0
    },
    sellingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Create unique index on category-size-color-userId combination
inventorySchema.index({ category: 1, size: 1, color: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Inventory', inventorySchema);
