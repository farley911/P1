var express = require('express');
var router = express.Router();
var core = require('./modules/core');
var auth = require('./modules/auth');
var registration = require('./modules/registration');
var user = require('./modules/user');

// CORE ROUTES
router.index = core.renderIndex; // GET home page
router.get('/getenv', core.getEnv); // Get the enviornment

// AUTH ROUTES
router.post('/login', auth.login); // Log a local user into the application using passport
router.get('/logout', auth.logout); // Log the current user out of the system
router.get('/isLoggedIn', auth.isLoggedIn); // Check is the user is logged in
router.post('/updatePassword', auth.updatePassword); // Updates a users password
router.post('/forgotPassword', auth.forgotPassword); // Send forgot password email

// REGISTRATION ROUTES
router.post('/register', registration.register); // Register the user for the application
router.post('/doesUserExist', registration.doesUserExist); // Check is a user is already registered
router.post('/checkUsername', registration.checkUsername); // Check is a username is taken

// USER ROUTES
router.get('/getUser', user.getUser); // Get the current user;

module.exports = router;