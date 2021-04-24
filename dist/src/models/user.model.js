"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

var _auth = require("../services/auth");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaCreate = require("../utils/schemaCreate");

var _post = require("./post.model");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const friendsIdSchema = (0, _schemaCreate.schema)({
  type: _mongoose.Schema.Types.ObjectId
});
const addressSchema = (0, _schemaCreate.schema)({
  zipCode: Number,
  street: String,
  number: Number,
  state: String,
  district: String,
  city: String,
  reference: String,
  country: String
});
const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email must be unique']
  },
  password: {
    type: String,
    required: true
  },
  photo: String,
  address: [{
    type: addressSchema
  }],
  telephone: Number,
  cpf: Number,
  favorites: {
    friends: [{
      type: _mongoose.Schema.Types.ObjectId
    }],
    sports: [{
      type: _mongoose.Schema.Types.ObjectId
    }],
    places: [{
      type: _mongoose.Schema.Types.ObjectId
    }]
  },
  friends: [{
    type: friendsIdSchema
  }],
  singupDate: Date,
  PostsUserSchema: [{
    type: _post.postsUserSchema,
    ref: 'PostsUser'
  }]
});
UserSchema.path('email').validate(async email => {
  const emailCount = await _mongoose.default.models.User.countDocuments({
    email
  });
  return !emailCount;
}, 'Already exists in the database', _schemaCreate.CustomDocuments.DUPLICATED);
UserSchema.pre('save', async function () {
  if (this.password || !this.isModified('password')) {
    try {
      const hashedPassword = await _auth.AuthService.hashPassword(this.password);
      this.password = hashedPassword;
    } catch (error) {
      console.error(`Error hashing the password for the user ${this.name}`);
    }
  }
});

const UserModel = _mongoose.default.model('User', UserSchema);

exports.UserModel = UserModel;