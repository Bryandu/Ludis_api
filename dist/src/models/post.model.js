"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postsUserSchema = void 0;

var _schemaCreate = require("../utils/schemaCreate");

var _mongoose = require("mongoose");

const badgesSchema = (0, _schemaCreate.schema)({
  badgeType: String,
  amount: Number,
  givenby: String
});
const postsUserSchema = (0, _schemaCreate.schema)({
  postDate: Date,
  postFiles: [String],
  description: String,
  localization: String,
  author: String,
  markings: [{
    users: [{
      type: _mongoose.Schema.Types.ObjectId
    }],
    groups: [{
      type: _mongoose.Schema.Types.ObjectId
    }],
    companies: [{
      type: _mongoose.Schema.Types.ObjectId
    }]
  }],
  badges: [{
    type: badgesSchema
  }]
});
exports.postsUserSchema = postsUserSchema;