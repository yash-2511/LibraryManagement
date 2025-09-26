const express = require('express');
const { getUsers, updateUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes in this file are for admins only
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getUsers);
router.route('/:id').put(updateUser);

module.exports = router;
