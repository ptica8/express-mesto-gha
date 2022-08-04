const Card = require('../models/cards');
const {BAD_REQUEST, NOT_FOUND_STATUS, INTERNAL_SERVER_ERROR} = require('../errors');

module.exports.getCards = (req, res) => {
    Card.find({})
        .then(cards => res.send(cards))
        .catch(err => res.status(INTERNAL_SERVER_ERROR).send({message: 'Произошла ошибка сервера'}))
}

module.exports.createCard = (req, res) => {
    const {name, link} = req.body;
    Card.create({name, link, owner: req.user._id})
        .then(newCard => res.send({data: newCard}))
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(BAD_REQUEST).send({message: 'Введены некорректные данные'});
            } else {
                res.status(INTERNAL_SERVER_ERROR).send({message: 'Произошла ошибка сервера'});
            }
        })
}

module.exports.deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({message: 'Карточка удалена'}))
        .catch(err => {
            if (err.name === 'CastError') {
                res.status(BAD_REQUEST).send({message: 'Некорректный id карточки'});
            } else if (err.message === 'NotFound') {
                res.status(NOT_FOUND_STATUS).send({message: 'Запрашиваемая карточка не найдена'});
            } else {
                res.status(INTERNAL_SERVER_ERROR).send({message: 'Произошла ошибка сервера'});
            }
        })
}

module.exports.putLikeOnCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
    )
        .then((card) => res.send({likes: card.likes}))
        .catch(err => {
            if (err.name === 'CastError') {
                res.status(BAD_REQUEST).send({message: 'Некорректный id карточки'});
            } else if (err.message === 'NotFound') {
                res.status(NOT_FOUND_STATUS).send({message: 'Запрашиваемая карточка не найдена'});
            } else {
                res.status(INTERNAL_SERVER_ERROR).send({message: 'Произошла ошибка сервера'});
            }
        })
}

module.exports.deleteCardLike = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
        .then((card) => res.send({likes: card.likes}))
        .catch(err => {
            if (err.name === 'CastError') {
                res.status(BAD_REQUEST).send({message: 'Некорректный id карточки'});
            } else if (err.message === 'NotFound') {
                res.status(NOT_FOUND_STATUS).send({message: 'Запрашиваемая карточка не найдена'});
            } else {
                res.status(INTERNAL_SERVER_ERROR).send({message: 'Произошла ошибка сервера'});
            }
        })
}