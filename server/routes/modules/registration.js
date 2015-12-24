'use strict'

// Models
var models = require('../../models');
var User = models.User;
var crypto = require('../../crypto');

exports.register = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if(!email || !password) {
    return res.status(401).json({ message: 'Email or Password fields were not filled out.' });
  }

  var user = User.create({ 
    username: req.body.username,
    email: crypto.encrypt(email), 
    password: password, 
    first_name: crypto.encrypt(req.body.first_name), 
    last_name: crypto.encrypt(req.body.last_name), 
    last_login: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(function(user) {
    user.first_name = crypto.decrypt(user.first_name);
    user.last_name = crypto.decrypt(user.last_name);
    user.email = crypto.decrypt(user.email);
    req.login(user, function(err) {
      if(err) {
        res.status(401).json(err);
      } else {
        res.status(200).json({});
      }
    });
    console.log('User created');
  })
  .catch(function(err) {
    console.log('User creation failed. Message: ' + err);
    res.send(err);
  });
};

exports.doesUserExist = function(req, res) {
  User.find({
    where: {
      email: crypto.encrypt(req.body.email)
    }
  })
  .then(function(user){
    if(user) {
      res.json({ message: 'user exists' });
    } else {
      res.json({ message: 'okay' });
    }
  })
  .catch(function(err){
    console.log('/doesUserExist check failed. Message: ' + err);
    res.send(err);
  })
};

exports.checkUsername = function(req, res) {
  User.find({
    where: {
      username: req.body.username
    }
  })
  .then(function(user) {
    if(user) {
      res.json({ message: 'username taken' });
    } else {
      res.json({ message: 'username available' });
    }
  })
  .catch(function(err) {
    console.log('/checkUsername failed. Message: ' + err);
    res.send(err);
  });
};