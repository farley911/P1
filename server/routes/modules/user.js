'use strict'

exports.getUser = function(req, res) {
  return res.json({ user: req.user });
}