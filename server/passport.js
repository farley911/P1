(function() {
  var models = require('./models');
  var User = models.User;

  /**
   * Passport authentication
   */
  var passport = require('passport');

  // Passport Local Strategy
  var locStrategy = require('passport-local').Strategy;

  // Passport LDAP Strategy
  var LdapStrategy = require('passport-ldapauth');
  var opts = {
    server: {
      url: 'ldap://adldap.regence.com:389',
      bindDn: 'cn=dhsiaas_bind',
      bindCredentials: 'i9Yqm$D#',
      searchBase: 'ou=Service Accounts,dc=regence,dc=com',
      searchFilter: '(samaccountname={{username}})'
    },
    usernameField: 'username'
  };

  passport.use(new LdapStrategy(opts));

  passport.use(new locStrategy({
      usernameField: 'username'
    },
    function(username, password, callback) {
      User.find({
        where: {
          username: username
        }
      })
      .then(function(user) {
        if(!user) {
          console.log('No such user found');
          return callback(null, false);
        }
        user.verifyPassword(password, function(err, isMatch) {
          if(err) {
            console.log('Error checking password. Error: ' + err);
            return callback(err);
          } else if(!isMatch) {
            // Password did not match
            console.log('Passwords did not match');
            return callback(null, false);
          } else {
            // Success
            console.log('User logged in');
            return callback(null, user);
          }
        });      
      })
      .catch(function(err) {
        console.log('Error logging user in. Message: ' + err);
        return callback(err);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  exports.isAuthenticated = passport.authenticate(['local', 'ldapauth']);
})();