// DB Config

var Sequelize = require('sequelize'); 
var env = process.env.NODE_ENV;
if(env === 'production' || env === 'ppmo'){
  var sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_pw,
    {
      host: process.env.db_host,
      dialect: 'mysql'
    }
  );
} else if(env === 'development') {
  var sequelize = new Sequelize(
    'framework',
    'efarley',
    'W%E!wW6x',
    {
      logging: console.log,
      define: {
        timestamps: false
      }
    }
  );
}

var models = [
  'User'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports.sequelize = sequelize;
module.exports.AES_KEY = process.env.AES_KEY;