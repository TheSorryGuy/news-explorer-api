module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/newsexplorerDB';
module.exports.SECRET = process.env.JWT_SECRET || 'secret-key';
module.exports.SERVER_PARAMS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
module.exports.URL_REGEX = /^https?:\/\/(www.)?(((2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])\.){3}(2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])|([\w-]{2,}(\.[\w-]{2,})*\.[a-zA-Z]{2,}))(:\d{2,5})?(\/[\d/a-zA-Z-]+(\.[\d/a-zA-Z-]+)?#?)?$/;
