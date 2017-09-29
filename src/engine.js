// http-get-regex-capture/src/engine.js

'use strict';

const Q = require('q');	// Promises for JavaScript. See https://www.npmjs.com/package/q and https://github.com/kriskowal/q

function httpGetRegexCaptureEngine (request, url, regexes, options = {}) {
	// const returnedMatchesAreAlwaysLists = options && options.returnedMatchesAreAlwaysLists;
	const returnHttpResponseBody = options && options.returnHttpResponseBody;
	const returnHttpResponseStatus = options && options.returnHttpResponseStatus;
	const returnMatchObject = options && options.returnMatchObject;

	let deferred = Q.defer();

	request(url, (error, response, body) => {

		if (error) {
			console.error('Error:', error);
			deferred.reject(error);
		} else {
			// console.log('Response:', response);
			// console.log('Response.statusCode:', response.statusCode);
			// console.log('Response.statusMessage:', response.statusMessage);
			// console.log('Body:', body);
			let result = {};

			if (returnHttpResponseBody) {
				result.httpResponseBody = body;
			}

			if (returnHttpResponseStatus) {
				result.httpResponseStatusCode = response && response.statusCode;
				result.httpResponseStatusMessage = response && response.statusMessage;
			}

			result.regexMatchResults = regexes.map(regex => {
				// console.log('Regex:', regex);
				let matchResult = { regex: regex, match: '' };	// ..., match: []
				// const match = regex.exec(body);
				const match = body.match(regex);

				// TODO: Support the return of multiple captures from a global(/.../g) regex.
				// TODO: Implement returnedMatchesAreAlwaysLists : matchResult.match = match.slice(1); ?

				if (regex.global) {
					matchResult.match = match;
				} else if (match.length === 2) {
					matchResult.match = match[1];
				} else {
					console.error('Regex', regex, ': match.length is', match.length);
				}

				if (returnMatchObject) {
					matchResult.matchObject = match;
				}

				return matchResult;
			});

			deferred.resolve(result);
		}
	});

	return deferred.promise;
}

module.exports = httpGetRegexCaptureEngine;
