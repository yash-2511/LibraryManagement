const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Book', 'Movie'],
        default: 'Book',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Available', 'Issued'],
        default: 'Available',
    },
    procurementDate: {
        type: Date,
        default: Date.now,
    },
    cost: {
        type: Number
    }
});

module.exports = mongoose.model('Book', BookSchema);