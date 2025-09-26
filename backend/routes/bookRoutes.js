const express = require('express');
const { addBook, getBooks } = require('../controllers/bookController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Both users and admins can view/search books
router.get('/', protect, getBooks);

// Only admins can add books
router.post('/', protect, authorize('admin'), addBook);

module.exports = router;