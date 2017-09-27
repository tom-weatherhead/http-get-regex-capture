// http-get-regex-capture/src/engine.js

'use strict';

const Q = require('q');	// Promises for JavaScript. See https://www.npmjs.com/package/q and https://github.com/kriskowal/q
const request = require('request');	// See https://www.npmjs.com/package/request

function matchRegexesInWebPage(url, regexes, options = {}) {
	const returnedMatchesAreAlwaysLists = options && options.returnedMatchesAreAlwaysLists;

	let deferred = Q.defer();

	request(url, (error, response, body) => {

		if (error) {
			console.error('Error:', error);
			deferred.reject(error);
		} else {
			// console.log('Response:', response);

			const result = regexes.map(regex => {
				let matchResult = { regex: regex, match: '' };	// ..., match: []
				const match = regex.exec(body);
				
				// TODO: Support the return of multiple captures from a global(/.../g) regex.
				// TODO: Implement returnedMatchesAreAlwaysLists : matchResult.match = match.slice(1); ?

				if (match.length === 2) {
					matchResult.match = match[1];
				} else {
					console.error('Regex', regex, ': match.length is', match.length);
				}
				
				return matchResult;
			});

			deferred.resolve(result);
		}
	});

	return deferred.promise;
}

module.exports = matchRegexesInWebPage;
