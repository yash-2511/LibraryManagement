const User = require('../models/User');
const jwt = require('jsonwebtoken');

// New function for public registration
exports.publicRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Basic validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        const user = await User.create({ name, email, password, role });
        
        // After creating user, generate a token to log them in directly
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// (Admin only) registration function
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body;
        const user = await User.create({ name, email, password, role, status });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    // --- Start of Debugging Logs ---
    console.log("--- Login Attempt ---");
    console.log("1. Email from form:", email);
    console.log("2. Password from form:", password);
    // --- End of Debugging Logs ---

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    
    // --- Start of Debugging Logs ---
    console.log("3. User found in DB:", user ? user.email : "No user found!");
    // --- End of Debugging Logs ---

    if (!user) {
        console.log("Login failed: User not found for this email.");
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // --- Start of Debugging Logs ---
    console.log("4. Password from DB:", user.password);
    // --- End of Debugging Logs ---

    const isMatch = user.matchPassword(password);
    
    // --- Start of Debugging Logs ---
    console.log("5. Do passwords match?", isMatch);
    console.log("----------------------");
    // --- End of Debugging Logs ---

    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};

// Get current logged in user
exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
};

