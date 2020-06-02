require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors, Joi, celebrate } = require('celebrate');

const {
  PORT, DATABASE_URL, SERVER_PARAMS, URL_REGEX,
} = require('./config');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT);
mongoose.connect(DATABASE_URL, SERVER_PARAMS);
