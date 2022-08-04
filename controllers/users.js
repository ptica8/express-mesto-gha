const User = require('../models/users');
const { BAD_REQUEST, NOT_FOUND_STATUS, INTERNAL_SERVER_ERROR } = require('../errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный id пользователя' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((updateUser) => res.send({ data: updateUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const newAvatar = req.body.avatar;
  User.findByIdAndUpdate(req.user._id, { avatar: newAvatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((updateUser) => res.send({ data: updateUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};
