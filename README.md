# http-get-regex-capture

[![build status](https://secure.travis-ci.org/tom-weatherhead/http-get-regex-capture.svg)](http://travis-ci.org/tom-weatherhead/http-get-regex-capture)  [![downloads](https://img.shields.io/npm/dt/http-get-regex-capture.svg)](https://www.npmjs.com/package/http-get-regex-capture)

Obtain text via an HTTP GET request, and then capture pieces of the text with regular expressions.

The demo app determines the latest stable versions of Node.js and Ruby by scraping their respective Websites.

Git installation and execution instructions:

Install Git.

Install Node.js (e.g. via [nvm](https://github.com/creationix/nvm) or [Nodist](https://github.com/marcelklehr/nodist)).

In a terminal:

	$ npm i -g grunt
	$ git clone https://github.com/tom-weatherhead/http-get-regex-capture.git
	$ cd http-get-regex-capture
	$ npm i
	$ grunt
	$ npm start node
	$ npm start ruby

Note: The command "grunt" runs lint, unit, and security tests.

npm installation and execution instructions:

	$ npm i -g http-get-regex-capture
	$ thaw-latest-version-of node
	$ thaw-latest-version-of ruby

Options:

	- returnHttpResponseBody: Boolean. If true, the body of the HTTP response will be returned as result.httpResponseBody .

	- returnHttpResponseStatus: Boolean. If true, the status code and status message of the HTTP response will be returned as result.httpResponseStatusCode and result.httpResponseStatusMessage respectively.

	- returnMatchObject: Boolean.

Example 1:

	const matchRegexesInWebPage = require('http-get-regex-capture');

	const url = 'https://nodejs.org/en/';
	const regexes = [
		/Download v{0,1}(\S+)\s+Current/
	];
	const options = {
		returnHttpResponseStatus: true
	};

	matchRegexesInWebPage(url, regexes, options)	// Returns a Promise from the npm package 'q'.
		.then(result => {
			console.log('HTTP Reponse status:', result.httpResponseStatusCode, result.httpResponseStatusMessage);
			console.log('The latest available stable version of Node.js is', result.regexMatchResults[0].match);
		})
		.fail(error => {
			console.error('Failed to determine the latest available stable version of Node.js. Error:', error);
		})
		.done();
