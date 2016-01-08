'use strict'

exports.generateHTML = function(email) {
	var html = 
	'<h2>Password Reset Instructions for P1</h2>' +
		'<p>' +
			'We have recieved a request to reset your password for the P1 boiler plate. If you are the one who initiated this request please click <a href="/resetPassword/' + email + '">here</a> to reset your password.' +
		'</p>' +
		'<p>' +
			'If you are unable to click on the link above please copy the following URL into your browsers URL bar. http://www.ericfarley.net/resetPassword/' + email +
		'<p>' +
			'If you were not the one who initiated this request then please disregard this email, no further action is required by you.' +
		'</p>' +
		'<p>' +
			'Thank you,<br />' +
			'Eric Farley' +
		'</p>';

	return html;
}