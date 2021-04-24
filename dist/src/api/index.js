"use strict";

var _App = require("../app/App");

(async () => {
  const setup = new _App.SetupApp();
  await setup.init();
  setup.startApp();
})();