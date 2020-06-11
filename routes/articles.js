const articlesRouter = require('express').Router();
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../config');
const { getArticles, postArticle, deleteArticle } = require('../controllers/articles');

const idValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

articlesRouter.get('/articles', getArticles);
articlesRouter.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(URL_REGEX),
    image: Joi.string().required().pattern(URL_REGEX),
  }),
}), postArticle);
articlesRouter.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().custom(idValidator, 'id validator'),
  }),
}), deleteArticle);

module.exports = articlesRouter;
