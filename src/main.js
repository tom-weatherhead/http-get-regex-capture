// http-get-regex-capture/src/main.js

'use strict';

const request = require('request');	// See https://www.npmjs.com/package/request

const engine = require('./engine.js');

function matchRegexesInWebPage(url, regexes, options = {}) {
	return engine(request, url, regexes, options);
}

module.exports = matchRegexesInWebPage;
