"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _core = require("@overnightjs/core");

var _user = require("../models/user.model");

var _error = require("../middlewares/errors/error");

var _internalError = require("../utils/errors/internalError");

var _validateErrors = require("../utils/errors/validateErrors");

var _auth = require("../services/auth");

var _auth2 = require("../middlewares/auth/auth.middlerawe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let UserController = (_dec = (0, _core.Controller)('users'), _dec2 = (0, _core.ClassErrorMiddleware)(_error.errorMiddleware), _dec3 = (0, _core.Get)(''), _dec4 = (0, _core.Middleware)(_auth2.authMiddleware), _dec5 = (0, _core.Get)(':id'), _dec6 = (0, _core.Middleware)(_auth2.authMiddleware), _dec7 = (0, _core.Post)('authenticate'), _dec8 = (0, _core.Post)(''), _dec9 = (0, _core.Put)('address/:id'), _dec10 = (0, _core.Middleware)(_auth2.authMiddleware), _dec(_class = _dec2(_class = (_class2 = class UserController extends _validateErrors.ValidateError {
  async getAll(_req, res, next) {
    try {
      const users = await _user.UserModel.find();
      res.send(users);
    } catch (error) {
      next(new _internalError.InternalError(error.message));
    }
  }

  async getUserById(req, res, next) {
    const user = await _user.UserModel.findById(req.params.id);

    if (!user) {
      return next(new _internalError.InternalError('User not found', 404, 'The user id canot be found in database'));
    }

    res.send(user);
  }

  async authenticateUser(req, res, next) {
    const user = await _user.UserModel.findOne({
      email: req.body.email
    });

    if (!user) {
      return next(new _internalError.InternalError('User not found!', 404));
    }

    if (!(await _auth.AuthService.comparePassword(req.body.password, user.password))) {
      return next(new _internalError.InternalError('Unauthorized! Password does not match!', 401));
    }

    const token = _auth.AuthService.createToken(user.toJSON());

    res.status(200).send({
      token: token
    });
  }

  async createUser(req, res) {
    try {
      const userModel = new _user.UserModel(req.body);
      const result = await userModel.save();
      res.status(201).send(result);
    } catch (error) {
      this.sendResponseErrorValidade(res, error);
    }
  }

  async updateAddress(req, res, next) {
    const {
      id
    } = req.params;

    if (req.body !== {}) {
      try {
        await _user.UserModel.updateOne({
          _id: id
        }, {
          $push: {
            address: req.body
          }
        });
        res.send(req.body);
      } catch (error) {
        next(new _internalError.InternalError(error.message));
      }
    } else {
      next(new _internalError.InternalError('Address required!', 415));
    }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getAll", [_dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "getAll"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getUserById", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "getUserById"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "authenticateUser", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "authenticateUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createUser", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "createUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateAddress", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "updateAddress"), _class2.prototype)), _class2)) || _class) || _class);
exports.UserController = UserController;