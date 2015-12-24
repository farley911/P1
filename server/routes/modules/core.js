'use strict'

exports.renderIndex = function(req, res) {
  res.render('index.html');
};

exports.getEnv = function(req, res) {
  var env = process.env.NODE_ENV;
  res.json({ env: env });
};