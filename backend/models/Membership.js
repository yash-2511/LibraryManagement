const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    // Link to the User model
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A user reference is required.'],
    },
    membershipId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
    },
    contactNumber: {
        type: String,
        required: [true, 'Please add a contact number'],
    },
    contactAddress: {
        type: String,
        required: [true, 'Please add an address'],
    },
    aadharCardNo: {
        type: String,
        required: [true, 'Please add an Aadhar card number'],
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
    pendingFine: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Membership', MembershipSchema);

