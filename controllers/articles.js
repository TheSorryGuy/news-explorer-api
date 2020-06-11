const article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
const AccessError = require('../errors/accessError');
const { noArticle, noAccessToDelete } = require('../errors/errorMessages');

module.exports.getArticles = (req, res, next) => {
  article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((newArticle) => res.send(newArticle))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  article.findOne({ _id: req.params.articleId }).select('+owner')
    .orFail(new NotFoundError(noArticle))
    .then((articleExist) => {
      if (!articleExist.owner.equals(req.user._id)) {
        throw new AccessError(noAccessToDelete);
      }
      articleExist.remove();
      res.send(articleExist);
    })
    .catch(next);
};
