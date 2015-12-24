'use strict'

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var key = process.env.AES_KEY;

exports.encrypt = function(value) {
  var cipher = crypto.createCipher(algorithm, key);
  var encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

exports.decrypt = function(value) {
  var decipher = crypto.createDecipher(algorithm, key);
  var decrypted = decipher.update(value, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};