"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViaCep = exports.ClientErrorResponse = exports.ClientErrorRequest = void 0;

var _internalError = require("../utils/errors/internalError");

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ViaCepResourceConfig = _config.default.get('App.resources.ViaCep');

class ClientErrorRequest extends _internalError.InternalError {
  constructor(message) {
    super(`Unexpected error when tryng to communication to ViaCep: ${message}`);
  }

}

exports.ClientErrorRequest = ClientErrorRequest;

class ClientErrorResponse extends _internalError.InternalError {
  constructor(message) {
    super(`An error was returned from response ViaCep: ${message}`);
  }

}

exports.ClientErrorResponse = ClientErrorResponse;

class ViaCep {
  async fetchCep(cep) {
    try {
      const response = await _axios.default.get(`${ViaCepResourceConfig.get('apiUrl')}/${cep}/json/`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status) {
        throw new ClientErrorResponse(`Error ${JSON.stringify(error.response.data)}, code: ${error.reesponse.status}`);
      }

      throw new ClientErrorRequest(error.message);
    }
  }

}

exports.ViaCep = ViaCep;