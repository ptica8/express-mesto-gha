const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const errorRoutes = require('./routes/error');
const auth = require('./middlewares/auth');
const serverError = require('./middlewares/serverError');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/', authRoutes);
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);
app.use('/', errorRoutes);
app.use(errors());
app.use(serverError);

app.listen(PORT);
