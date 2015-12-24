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
	4) Install nodemon 
		Run > npm install -g nodemon
	5) Install bower 
		Run > npm install -g bower
	6) Instal Karma Command Line Interface
		Run > npm install -g karma-cli
	7) Pull repository from bitbucket
	8) Install Python. Use at least version 2.5.0 however 3.x.x versions will not work
		http://www.python.org/getit/windows/
	9) Install Microsoft Visual Studio Express 2013 for Windows Desktop with Update 4
		https://www.microsoft.com/en-us/download/confirmation.aspx?id=44914
	10) Install node-gyp
		1) Run > npm install -g node-gyp
	11) In a node.js command prompt navigate to the repo
	12) Run > npm install
	13) Install Chrome extension postman REST client // This isn't necessary but it helps debug API endpoints.
		https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en
		
### Environment variables

	SESSION_SECRET -> use any long nonsensical sentence. i.e. 'The green card climbed robin hood's luggage and found a purple sun eating some BBQ; Bazinga he exclaimed!'
	NODE_ENV -> use either 'development', 'ppmo' or 'production'
	AES_KEY -> This can be anything for development however you need to use the same key every time or you will get different values for encrypted items later when the key changes. For production enviorments (ppmo & prod) use a long base64 encrypted string so it's computationally expensive to brute force crack.
	
### Running the app

	1) Open a ruby command prompt
	2) Navigate to the /app directory
	3) Run > compass watch // Tells compass to watch for SASS changes
	4) Open a node.js command prompt
	5) Navigate to the /app directory
	6) Run > set session_secret=some secret // Sets the session secret environment variable
	7) Run > set node_env=development // Sets node_env to development
	8) Run > npm start // Starts the application and monitors for app changes. Also starts postman debugger

### Running tests

	1) Open a ruby command prompt
	2) Navigate to the /tests directory
	3) Run > karma start karma.config.js
	
	TIP: If you want to only run a single test of suite of tests use "fdescribe" and "fit" instead of "describe" and "it" to indicate which tests to run; All other tests will be ignored.
	TIP: If you want to disable a single test or a suite of tests use "xdescribe" and "xit" instead of "describe" and "it" to indicate which tests should be ignored; All other tests will run.

### Checking code coverage

	Karma will automaticly check the coverage of your unit tests whenever it detects a change to the code. To view the coverage results navigate to the following directory:
	
	/tests/coverage/**/index.html 
	
	TIP: You will see a folder with the coverage results for each browser being monitored, denoted by '**' in the path above.
	
### Receiving updates from upstream

Just fetch the changes and merge them into your project with git.


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
					ui.bootstrap-tpls-0.12.0.min.js	--> Angular bootstrap UI	
					angular/			--> contains angular code and add-ons
						i18n/				--> language files
						angular.js			--> the latest angular js
						angular.min.js		--> the latest minified angular js
						angular-*.js		--> angular add-on modules
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