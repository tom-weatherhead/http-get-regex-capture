// http-get-regex-capture/src/engine.js

'use strict';

const Q = require('q');	// Promises for JavaScript. See https://www.npmjs.com/package/q and https://github.com/kriskowal/q

function httpGetRegexCaptureEngine (request, url, regexes, options = {}) {
	const returnHttpResponseBody = options && options.returnHttpResponseBody;
	const returnHttpResponseStatus = options && options.returnHttpResponseStatus;
	const returnMatchObject = options && options.returnMatchObject;

	let deferred = Q.defer();

	request(url, (error, response, body) => {

		if (error) {
			console.error('HTTP GET request resulted in an error:', error);
			deferred.reject(error);
		} else {
			let result = {};

			if (returnHttpResponseBody) {
				result.httpResponseBody = body;
			}

			if (returnHttpResponseStatus) {
				result.httpResponseStatusCode = response && response.statusCode;
				result.httpResponseStatusMessage = response && response.statusMessage;
			}

			result.regexMatchResults = regexes.map(regex => {
				let matchResult = { regex: regex, match: '', matches: [] };

				// See https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression

				const indexOfCaptureGroup = 1;
				let match;

				while ((match = regex.exec(body)) !== null) {
					matchResult.matches.push(match[indexOfCaptureGroup]);

					if (!regex.global) {
						// See https://stackoverflow.com/questions/31969913/why-does-this-regexp-exec-cause-an-infinite-loop
						break;
					}
				}

				if (matchResult.matches.length > 0) {
					matchResult.match = matchResult.matches[0];
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
