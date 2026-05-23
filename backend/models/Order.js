const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    customerPhone: {
        type: String,
        trim: true
    },
    customerAddress: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: [{
        category: String,
        size: String,
        color: String,
        quantity: Number,
        costPrice: Number,
        sellPrice: Number,
        unitCost: Number,
        unitSell: Number
    }],
    actualCost: {
        type: Number,
        required: true,
        default: 0
    },
    sellPrice: {
        type: Number,
        required: true,
        default: 0
    },
    codTax: {
        type: Number,
        default: 0
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    
    paymentMethod: {
        type: String,
        enum: ['COD', 'Prepaid'],
        default: 'COD'
    },
    parcelType: {
        type: String,
        enum: ['', 'Allow to Open', 'COD Retail'],
        default: ''
    },
    total: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Dispatched', 'Completed', 'Returned'],
        default: 'Pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
