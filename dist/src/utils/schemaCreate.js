"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.CustomDocuments = void 0;

var _mongoose = require("mongoose");

let CustomDocuments;
exports.CustomDocuments = CustomDocuments;

(function (CustomDocuments) {
  CustomDocuments["DUPLICATED"] = "DUPLICATED";
})(CustomDocuments || (exports.CustomDocuments = CustomDocuments = {}));

const schema = schema => {
  return new _mongoose.Schema(schema);
};

exports.schema = schema;