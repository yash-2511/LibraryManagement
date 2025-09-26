const express = require('express');
const {
    issueBook,
    returnBook,
    payFine,
    getActiveIssues,
    getOverdueReturns,
    getMyTransactions,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All transaction routes are protected

router.get('/my-transactions', getMyTransactions);
router.post('/issue', issueBook);
router.post('/return', returnBook);
router.put('/pay-fine/:transactionId', payFine);
router.get('/active', getActiveIssues);
router.get('/overdue', getOverdueReturns);

module.exports = router;

