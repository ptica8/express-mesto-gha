const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
    Card.find({})
        .then(cards => res.send(cards))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.createCard = (req, res) => {
    const {name, link} = req.body;
    Card.create({name, link, owner: req.user._id})
        .then(newCard => res.send({data: newCard}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({message: 'Карточка удалена'}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.putLikeOnCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
    )
        .then((card) => res.send({likes: card.likes}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.deleteCardLike = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
        .then((card) => res.send({likes: card.likes}))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}