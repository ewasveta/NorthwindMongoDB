const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/db');
const mongoose = require('mongoose');

// Mongo DB Connection
mongoose.connect(config.url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(
  () => console.log("Connected to db")
).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/employees', employeesRouter);

module.exports = app;
