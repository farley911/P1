# AngularJS Boilerplate - Codename: P1

This application is build on the Angular.js for the frontend and Express, Node & mySQL for the backend.

### Setup
	
	1) Install wamp
		http://www.wampserver.com/
		a) Run wampmanager.exe
	2) Install rubyInstaller 
		http://rubyinstaller.org/
	2) Install compass 
		1) Run > gem update --system
		2) Run > gem install compass
	3) Install Node.js
		http://nodejs.org/download/
	4) Install bower 
		Run > npm install -g bower
	5) Instal Karma Command Line Interface
		Run > npm install -g karma-cli
	6) Pull repository from bitbucket
	7) Install Python. Use at least version 2.5.0 however 3.x.x versions will not work
		http://www.python.org/getit/windows/
	8) Install Microsoft Visual Studio Express 2013 for Windows Desktop with Update 4
		https://www.microsoft.com/en-us/download/confirmation.aspx?id=44914
	9) Install node-gyp
		1) Run > npm install -g node-gyp
	10) In a node.js command prompt navigate to the repo
	11) Run > npm install
	12) Install Chrome extension postman REST client // This isn't necessary but it helps debug API endpoints.
		https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en
		
## Environment variables

	SESSION_SECRET -> use any long nonsensical sentence. i.e. 'The green card climbed robin hood's luggage and found a purple sun eating some BBQ; Bazinga he exclaimed!'
	NODE_ENV -> use either 'development', 'ppmo' or 'production'
	AES_KEY -> This can be anything for development however you need to use the same key every time or you will get different values for encrypted items later when the key changes. For production enviorments (ppmo & prod) use a long base64 encrypted string so it's computationally expensive to brute force crack.
	SMTP_HOST -> a valid SMTP host address i.e. some.host.com
	SMTP_USER -> SMTP host username
	SMTP_PASS -> SMTP host password
	
## Running the app

	1) Open a ruby command prompt
	2) Navigate to the /app directory
	3) Run > compass watch // Tells compass to watch for SASS changes
	4) Open a node.js command prompt
	5) Navigate to the /app directory
	6) Run > set session_secret=some secret // Sets the session secret environment variable
	7) Run > set node_env=development // Sets node_env to development
	8) Run > npm start // Starts the application and monitors for app changes. Also starts postman debugger

## Running tests

	1) Open a ruby command prompt
	2) Navigate to the /tests directory
	3) Run > karma start karma.config.js
	
	TIP: If you want to only run a single test of suite of tests use "fdescribe" and "fit" instead of "describe" and "it" to indicate which tests to run; All other tests will be ignored.
	TIP: If you want to disable a single test or a suite of tests use "xdescribe" and "xit" instead of "describe" and "it" to indicate which tests should be ignored; All other tests will run.

## Checking code coverage

	Karma will automaticly check the coverage of your unit tests whenever it detects a change to the code. To view the coverage results navigate to the following directory:
	
	/tests/coverage/**/index.html 
	
	TIP: You will see a folder with the coverage results for each browser being monitored, denoted by '**' in the path above.
	
## Sending Emails from the application
	
	The application uses nodemailer to send SMTP emails. To send emails you must first set the enviornment variables for SMTP_HOST (host address), SMTP_USER (username), and SMTP_PASS (password). These variables will be uniuqe to the email server you are using.
	
	Once nodemailer has been configured you can send emails by following these instructions:
		
		1) Create a route in server/routes that calls your send email method on the desired server module.
		2) Create your emails template by creating new js file in /server/email_templates/some_template. 	
		3) Include core module in the module.
			require('./core')
		4) Include your emails template in the module.
			require('../../email_templates/some_template);
		5) Call core.sendMail(to, from, subject, html, callback) inside a module method.
			
			
### Example /server/email_templates/example_template.js
			
	'use strict'
	
	exports.generateHTML = function(some, variables) {
		var html = '<h1>Some HTML with ' + some + variable + '</h1>';
		return html;
	}
			
### Example /server/routes/modules/example_module.js
		
	'use strict'
	
	var core = require('./core),
		template = require('../../email_templates/template);
		
	exports.sendMyEmail = function(req, res) {
		core
			.sendMail(
				'to@someone.com',
				'from@someone.com',
				'Awesome subject line',
				template.generateHTML('some', req.body.variable),
				function(err, responseStatus) {
					if(!responseStatus) {
						// There was an error, you should handle it somehow.
					} else {
						// The email was sent successfully, congradulations. You should probably inform the user.
					}
				}
			)
	}

## Directory Layout
    
	app/				--> main app directory
		server.js           --> server config
		package.json        --> for npm
		node_modules/		--> node module directory
		public/             --> all of the files to be used in on the client side
			.sass-cache			--> needed for sass, this shouldn't be pushed to the server
			css/              	--> css files
				app.css         	--> default stylesheet
				img/              	--> image files
			js/               	--> javascript files
				angularApp.js       --> declare top-level app module
				lib/				--> angular and 3rd party JavaScript libraries
					jquery-2.1.4.min.js	--> jQuery 2.1.4
					angular/			--> contains angular code and add-ons
						i18n/				--> language files
						angular.js			--> the latest angular js
						angular.min.js		--> the latest minified angular js
						angular-*.js		--> angular add-on modules
						ui.bootstrap-tpls-0.14.3.min.js	--> Angular bootstrap UI	
						version.txt 		--> version number		
			modules/			--> Application modules
				app.module.js	--> main application module definition, to include a module in the application add it here.
				core/			--> Core module, place code here that should be available to the entire application.
				*/					--> individual module directories
					*.ctrl.js			--> controller code'
					*.directive.js		--> module directives
					*.html				--> view code
					*.factory.js		--> module factories
					*.module.js			--> module definition
					*.route.js			--> route definition
			sass/				--> sass code
				_base.scss			--> base styles across all projects
				_color.scss			--> color definitions
				_core.scss			--> appliction styles
				_fonts.scss			--> font definitions
				_*.scss				--> Module specific styles
				app.scss			--> includes all css resources and compass mixins
			config.rb			--> sass config
			index.html			--> main application HTML template
		server/ 			--> contains server directories/files
			crypto.js			--> AES 256 encryption/decryption
			passport.js			--> passport.js configuration
			email_templates/		--> Template directory for application emails
				*.js				--> Template for individual emails
			models/				--> sequelize models
				index.js			--> model index file, all models must be registered in this file
				*.js				--> model code
			routes/				--> contains application routes
				modules/			--> contains routes for each module
					*.js 				--> Route definition.
				index.js			--> route for serving index page and API routes
			Sessions/			--> Used for express.session to store user sessions for production
			SSL/				--> SSL certificates used for express.
		tests/				--> Unit testing files
			angular-mocks.js	--> mocks certain angular behaviours for testing purposes
			error.log			--> Karama error output file
			karma.config.js		--> configures unit testing enviornment
			coverage/			--> Code coverage 
				**/					--> Each browser being tested will create an associated coverage directory
					index.html			--> The results of the coverage checks
			modules/			--> Contains tests for modules
				**/					--> directory associated with each modules
					*.tests.js			-->	Unit tests