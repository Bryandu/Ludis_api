"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthService = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthService {
  static async hashPassword(password, salt = 10) {
    return await (0, _bcrypt.hash)(password, salt);
  }

  static async comparePassword(password, hashedPassword) {
    return await (0, _bcrypt.compare)(password, hashedPassword);
  }

  static createToken(payload, secret = _config.default.get('App.auth.key')) {
    const token = _jsonwebtoken.default.sign(payload, secret, {
      expiresIn: _config.default.get('App.auth.expiresIn')
    });

    return token;
  }

  static decodeToken(token, secreteKey = _config.default.get('App.auth.key'), options) {
    return _jsonwebtoken.default.verify(token, secreteKey, options);
  }

}

exports.AuthService = AuthService;