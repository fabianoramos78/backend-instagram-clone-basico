const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://fabianoramos:mix141501@cluster0-qsofr.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
}); // PASSWORD E USERNAME OBTIDOS NO MONGODB ATLAS (https://cloud.mongodb.com)

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
