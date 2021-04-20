"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupApp = void 0;

require("../utils/module-alias");

var _user = require("../controllers/user.controller");

var _express = require("express");

var _core = require("@overnightjs/core");

var _database = require("../database/database");

var _helmet = _interopRequireDefault(require("helmet"));

var _mongoose = require("mongoose");

var _config = _interopRequireDefault(require("config"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetupApp extends _core.Server {
  constructor(port = _config.default.get('App.port')) {
    super();
    this.port = port;
  }

  async init() {
    _dotenv.default.config();

    this.SetupExpress();
    this.SetupControllers();
    await this.SetupDatabase();
    console.log(_config.default.get('App'));
  }

  async close() {
    await (0, _database.dbClose)();
  }

  SetupExpress() {
    this.app.use((0, _helmet.default)());
    this.app.use((0, _express.urlencoded)({
      extended: true
    }));
    this.app.use((0, _express.json)());
  }

  SetupControllers() {
    const userController = new _user.UserController();
    this.addControllers([userController]);
  }

  async SetupDatabase() {
    try {
      await (0, _database.dbConect)();
    } catch (error) {
      throw new _mongoose.Error(error);
    }
  }

  getApp() {
    return this.app;
  }

  startApp() {
    this.app.listen(this.port, () => {
      console.info(`Server listening on port ${this.port}...`);
    });
  }

}

exports.SetupApp = SetupApp;