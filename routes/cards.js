const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const avatarPattern = require('../avatarPattern');

const {
  getCards, createCard, deleteCard, putLikeOnCard, deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(avatarPattern).default('https://i.pinimg.com/736x/80/dd/b1/80ddb1e9dcead15d274ff746d385b8dd.jpg'),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), putLikeOnCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCardLike);

module.exports = router;
