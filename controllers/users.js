const User = require('../models/users.js');

module.exports.getUsers = (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
};

module.exports.getUsersById = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send({data: user}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
};

module.exports.createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    User.create({name, about, avatar})
        .then(newUser => res.send({data: newUser}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
};

module.exports.updateUserInfo = (req, res) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
        .then(updateUser => res.send({data: updateUser}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.updateUserAvatar = (req, res) => {
    const newAvatar = req.body.avatar;
    User.findByIdAndUpdate(req.user._id, {avatar: newAvatar}, {new: true, runValidators: true})
        .then(updateUser => res.send({data: updateUser}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}
