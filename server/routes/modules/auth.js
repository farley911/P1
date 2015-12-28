'use strict'
var passport = require('passport');
var secret = process.env.SESSION_SECRET;
var crypto = require('../../crypto');
var fs = require('fs');
var models = require('../../models');
var User = models.User;
var core = require('./core');
var forgotPasswordTemplate = require('../../email_templates/forgotPassword');

require('../../passport');

exports.forgotPassword = function(req, res) {
  core
    .sendMail(
      req.body.email, 
      'eric@ericfarley.net', 
      'Password Reset Instructions', 
      template.generateHTML(req.body.email),
      function (err, responseStatus) {
        if(!responseStatus) {
          return res.status(401).json({ err: err, message: 'Sorry but there appears to have been an error sending your email.' });  
        } else {
          return res.status(200).json({ message: 'Password reset instructions have been successfully emailed to your email address.' });
        }
      }
    );
}

// Log a local user into the application using passport
exports.login = function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if(err) { return next(err); }

    if(user) {
      User.find({
        where: {
          email: user.email
        }
      })
      .then(function(currentUser) {
        if(currentUser) {
          currentUser.updateAttributes({
            last_login: new Date()
          })
        }
      });
      user.email = crypto.decrypt(user.email);
      user.first_name = crypto.decrypt(user.first_name);
      user.last_name = crypto.decrypt(user.last_name);
      req.login(user, function(err) {
        if(err) {
          return res.status(401).json(err);
        } else {
          return res.status(200).json({});
        }
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);  
}

exports.logout = function(req, res) {
  req.logout();
  res.send(200);
};

exports.isLoggedIn = function(req, res) {
  var isLoggedIn = null;
  if(req.user) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  return res.json({ isLoggedIn: isLoggedIn });
};

exports.updatePassword = function(req, res) {
  var password = req.body.password;
  User.find({
    where: {
      email: crypto.encrypt(req.body.email)
    }
  })
  .then(function(user) {
    user.updateAttributes({
      password: password
    })
    .then(function() {
      console.log('Password reset');
      return res.status(200).json({ 
        username: user.username,
        password: password
      });
    })
    .catch(function(err) {
      return res.status(401).json({ message: 'Error!', error: err });
    });
  });
};