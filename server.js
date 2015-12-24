/**
 * Module dependencies
 */

var express = require('express'),
    app = module.exports = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    env = process.env.NODE_ENV || 'development',
    errorHandler = require('errorhandler'),
    http = require('http'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    passport = require('passport'),
    path = require('path'),
    routes = require('./server/routes/index'),
    secret = process.env.SESSION_SECRET,
    session = require('express-session'),
    FileStore = require('session-file-store')(session);
var secure = true;

/**
 * Configuration
 */

// all environments
app.set('http-port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.engine('.html', require('ejs').renderFile);
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if (env === 'development') {
  app.use(errorHandler());
  secure = false;
}
app.set('trust proxy', 1); // Trust first proxy
app.use(session({ 
  cookie: { 
    maxAge: (60 * 60 * 1000), // User session will expire after 60 minutes.
    secure: secure
  },
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: secret,
  store: new FileStore({
     path: './server/sessions',
  })
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */

routes.SESSION_SECRET = secret; // Set env var for the router;
app.use('/', routes); // Handle defined routes
app.get('/', routes.index); // Serve index
app.get('*', routes.index); // Redirect all others to the index (HTML5 history)

/**
 * Start Server
 */

var httpServer = http.createServer(app);
httpServer.listen(app.get('http-port'), function () {
  console.log('Express http server listening on port ' + app.get('http-port'));
});