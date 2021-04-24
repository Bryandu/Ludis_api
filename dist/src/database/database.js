"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbClose = exports.dbConnect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongoDbConfig = _config.default.get('App.database');

const mongoUrl = mongoDbConfig.get('mongoUrl');

const dbConnect = async () => {
  return await _mongoose.default.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

exports.dbConnect = dbConnect;

const dbClose = () => _mongoose.default.connection.close();

exports.dbClose = dbClose;