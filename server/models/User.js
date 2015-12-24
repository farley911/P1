var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

// Hash password before storing it.
encryptPassword = function(user, options, fn) {
  if (!user.changed('password'))
    return fn();

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return fn(err);
    user.password = hash;
    fn();
  });
}

module.exports = function(sequelize, DataTypes){
  return sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    last_login: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: function(user, options, fn) {
        encryptPassword(user, options, fn);
      },
      beforeUpdate: function(user, options, fn) {
        encryptPassword(user, options, fn);
      }
    },
    instanceMethods: {
      verifyPassword: function(password, callback) {
        bcrypt.compare(password, this.password, callback);
      },
      generateJWT: function(secret) {
        var today = new Date();
        var exp = new Date(today);
        exp.setHours(today.getHours() + 1); // Expires in 1 hour
        return jwt.sign({
          id: this.id,
          username: this.username,
          email: this.email,
          name: this.first_name + ' ' + this.last_name,
          exp: parseInt(exp.getTime() / 1000)
        }, secret);
      }
    }
  });
};