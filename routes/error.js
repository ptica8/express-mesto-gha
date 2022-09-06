const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('/404', (req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

router.use('/', (req, res) => {
  res.redirect('/404'); // перенаправляет на 404 стр
});

module.exports = router;
