const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// Get transactions for the logged-in user
exports.getMyTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id, status: 'issued' })
            .populate('book', 'name author serialNumber');
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Issue a book
exports.issueBook = async (req, res) => {
    try {
        const { bookId, issueDate, dueDate } = req.body;
        const userId = req.user.id;

        const book = await Book.findById(bookId);
        if (!book || book.status !== 'Available') {
            return res.status(400).json({ success: false, message: 'Book not available for issue' });
        }

        const transaction = await Transaction.create({
            book: bookId,
            user: userId,
            issueDate,
            dueDate,
        });

        book.status = 'Issued';
        await book.save();

        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { transactionId, returnDate } = req.body;

        const transaction = await Transaction.findById(transactionId).populate('book');
        if (!transaction || transaction.status === 'returned') {
            return res.status(400).json({ success: false, message: 'Invalid transaction or book already returned' });
        }

        transaction.returnDate = returnDate;
        transaction.status = 'returned';

        // Calculate fine (e.g., $1 per day overdue)
        const dueDate = new Date(transaction.dueDate);
        const actualReturnDate = new Date(returnDate);
        if (actualReturnDate > dueDate) {
            const diffTime = Math.abs(actualReturnDate - dueDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            transaction.fine = diffDays * 1; // $1 fine per day
        }

        await transaction.save();

        const book = await Book.findById(transaction.book._id);
        book.status = 'Available';
        await book.save();

        // Respond with transaction details including any fine
        res.status(200).json({ success: true, data: transaction });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Pay fine
exports.payFine = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await Transaction.findById(transactionId);

        if(!transaction) {
             return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        transaction.finePaid = true;
        await transaction.save();

        res.status(200).json({ success: true, data: transaction });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Get active issues
exports.getActiveIssues = async (req, res) => {
    try {
        const transactions = await Transaction.find({ status: 'issued' })
            .populate('book', 'name author serialNumber')
            .populate('user', 'name email');
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get overdue returns
exports.getOverdueReturns = async (req, res) => {
    try {
        const transactions = await Transaction.find({ status: 'issued', dueDate: { $lt: new Date() } })
            .populate('book', 'name author serialNumber')
            .populate('user', 'name email');
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

