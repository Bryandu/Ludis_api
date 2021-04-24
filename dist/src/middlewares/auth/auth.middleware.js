"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;

var _auth = require("../../services/auth");

const authMiddleware = (req, res, next) => {
  try {
    var _req$headers;

    const token = (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers['x-access-token'];

    const decoded = _auth.AuthService.decodeToken(token);

    req.decoded = decoded;
    next();
  } catch (error) {
    var _res$status, _res$status$call$send, _res$status$call;

    (_res$status = res.status) === null || _res$status === void 0 ? void 0 : (_res$status$call$send = (_res$status$call = _res$status.call(res, 401)).send) === null || _res$status$call$send === void 0 ? void 0 : _res$status$call$send.call(_res$status$call, {
      code: 401,
      message: error.message
    });
  }
};

exports.authMiddleware = authMiddleware;