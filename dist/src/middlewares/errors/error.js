"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMiddleware = errorMiddleware;

function errorMiddleware(err, _req, res, next) {
  res.status(err.code).json({
    message: err.message,
    code: err.code,
    description: err.description
  });
  next();
}