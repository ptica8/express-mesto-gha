const router = require('express').Router();

const {
  getUsers, getUsersById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersById);
router.get('/:userId', getUsersById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
