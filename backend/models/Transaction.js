const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['issued', 'returned'],
        default: 'issued',
    },
    fine: {
        type: Number,
        default: 0,
    },
    finePaid: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);