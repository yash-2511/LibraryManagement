const Book = require('../models/Book');

// Add a new book or multiple books (Admin only)
exports.addBook = async (req, res) => {
    try {
        const { type, name, author, category, procurementDate, cost, quantity } = req.body;
        
        // Validate quantity
        const numQuantity = parseInt(quantity, 10);
        if (isNaN(numQuantity) || numQuantity < 1) {
            return res.status(400).json({ success: false, message: 'Quantity must be a positive number.' });
        }

        const booksData = [];
        const categoryPrefix = category.substring(0, 2).toUpperCase();
        const typePrefix = type === 'Book' ? 'B' : 'M';

        for (let i = 0; i < numQuantity; i++) {
            // Generate a unique serial number for each copy
            // This combines prefix, a timestamp, and an index for uniqueness
            const uniqueId = `${Date.now()}`.slice(-6) + i;
            const serialNumber = `${categoryPrefix}${typePrefix}${uniqueId}`;

            booksData.push({
                type,
                name,
                author,
                category,
                procurementDate,
                cost,
                serialNumber // Add the generated serial number
            });
        }

        // Use insertMany to efficiently add all copies to the database
        const books = await Book.insertMany(booksData);
        res.status(201).json({ success: true, data: books });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all books with search and filter functionality
exports.getBooks = async (req, res) => {
    try {
        let query = {};

        // Filter by status (e.g., 'Available') for the issue book dropdown
        if (req.query.status) {
            query.status = req.query.status;
        }

        // Search by name, author, or category
        if (req.query.name) query.name = new RegExp(req.query.name, 'i');
        if (req.query.author) query.author = new RegExp(req.query.author, 'i');
        if (req.query.category) query.category = req.query.category;

        const books = await Book.find(query);
        
        // Explicitly check if the response should be an array
        if (Array.isArray(books)) {
            res.status(200).json({ success: true, count: books.length, data: books });
        } else {
            // Handle cases where the DB response isn't as expected
            res.status(500).json({ success: false, message: 'Error fetching books.' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

