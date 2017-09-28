// http-get-regex-capture/src/cli.js

'use strict';

const matchRegexesInWebPage = require('..');

function testHarness (url, regexes) {
	matchRegexesInWebPage(url, regexes)
		.then(result => {
			console.log('Result:', result);
		}).fail(error => {
			console.error('Error:', error);
		})
		.done();
}

testHarness('https://nodejs.org/en/', [/Download v(\S+)\s+Current/]);
testHarness('https://www.ruby-lang.org/en/downloads/', [/The current stable version is (\S+)\.\s+Please/]);
