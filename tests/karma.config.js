// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../public/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    

    // list of files / patterns to load in the browser
    files: [
      'js/lib/angular/angular.js', // Include angular first to avoide errors from it being undefined
      'js/angularApp.js',
      'js/lib/*.js',
      'js/lib/angular/angular-ui-states.js',
      'js/lib/angular/angular-messages.js',

      // include module definitions before the rest of the module code to ensure the module is available. 
      'modules/app.module.js',
      'modules/attention/attention.module.js',
      'modules/auth/auth.module.js',
      'modules/home/home.module.js',
      'modules/onboarding/onboarding.module.js',
      'modules/registration/registration.module.js',
      'modules/user/user.module.js',

      // include the remaining module files
      'modules/**/*.js',
      '../tests/angular-mocks.js',
      '../tests/modules/**/*.tests.js'
    ],


    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'coverage', 'html'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'html'],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../public/modules/**/*.js': ['coverage']
    },


    // reporter configuration
    coverageReporter: {
      type: 'html',
      dir: '../tests/coverage/'
    },

    // html reporter configuration
    htmlReporter: {
      outputDir: '../tests/karma_html'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // logger file output
    loggers: [{
      type: 'file',
      filename: '../tests/error.log'
    }],


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
