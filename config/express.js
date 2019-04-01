var express = require('express');


module.exports = function () {
  var app = express();
  app.set('port', process.env.PORT || 8020);
  return app;
};