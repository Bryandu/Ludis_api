"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateError = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ValidateError {
  sendResponseErrorValidade(res, error) {
    if (error instanceof _mongoose.default.Error) {
      const response = this.validationResponse(error);
      res.status(response.code).send(response);
    } else {
      res.status(500).send('Something wrong!');
    }
  }

  validationResponse(error) {
    const kindaError = Object.values(error.errors).filter(element => element.kind === 'DUPLICATED');

    if (kindaError.length) {
      return {
        code: 409,
        message: error.message
      };
    } else {
      return {
        code: 422,
        message: error.message
      };
    }
  }

}

exports.ValidateError = ValidateError;