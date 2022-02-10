const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser
} = require('../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId
router.delete('/:userId', deleteUser);

// /api/users/update/:userId
router.put('/update/:userId', updateUser)

module.exports = router;
