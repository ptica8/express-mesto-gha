const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const app = express();

mongoose
    .connect('mongodb://localhost:27017/mestodb')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use((req, res, next) => {
    req.user = {
        _id: '62eb9463ee9002b81ce72932'
    };
    next();
});
app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.listen(PORT);