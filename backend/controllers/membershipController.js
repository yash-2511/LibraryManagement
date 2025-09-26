const Membership = require('../models/Membership');
const User = require('../models/User'); // Import the User model

// @desc    Add a new membership (and corresponding user)
// @route   POST /api/memberships
// @access  Private/Admin
exports.addMembership = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email, // Email is now required to create a user
            contactNumber,
            contactAddress,
            aadharCardNo,
            membershipDuration,
        } = req.body;

        // Step 1: Check if a user with this email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'A user with this email already exists.' });
        }

        // Step 2: Create a new User for the member
        user = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: 'password123', // Assign a default password
            role: 'user',
        });

        // Step 3: Create the Membership record, linking it to the new user
        const startDate = new Date();
        const endDate = new Date();
        if (membershipDuration === '1 year') {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else if (membershipDuration === '2 years') {
            endDate.setFullYear(endDate.getFullYear() + 2);
        } else { // Default to 6 months
            endDate.setMonth(endDate.getMonth() + 6);
        }

        const membershipId = `MEM-${Date.now()}`;

        const membership = await Membership.create({
            user: user._id, // This is the crucial line that links the membership to the user
            membershipId,
            firstName,
            lastName,
            contactNumber,
            contactAddress,
            aadharCardNo,
            startDate,
            endDate,
            status: 'Active',
        });

        res.status(201).json({ success: true, data: membership });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all memberships
// @route   GET /api/memberships
// @access  Private/Admin
exports.getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find({}).populate('user', 'name email'); // Populate user details
        res.status(200).json({ success: true, count: memberships.length, data: memberships });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

