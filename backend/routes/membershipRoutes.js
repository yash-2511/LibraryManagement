const express = require('express');
const {
    addMembership,
    getMemberships,
} = require('../controllers/membershipController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes in this file are protected and for admins only
router.use(protect, authorize('admin'));

router
    .route('/')
    .post(addMembership)
    .get(getMemberships);

module.exports = router;

