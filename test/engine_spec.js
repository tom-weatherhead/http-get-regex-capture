// http-get-regex-capture/test/engine_spec.js

'use strict';

const engine = require('../src/engine.js');

const chai = require('chai');
const expect = chai.expect;

// testHarness('https://nodejs.org/en/', [/Download v(\S+)\s+Current/]);
// testHarness('https://www.ruby-lang.org/en/downloads/', [/The current stable version is (\S+)\.\s+Please/]);

function makeMockRequest (body) {
	return (url, callback) => {
		const error = null;
		const response = {
			statusCode: 200,
			statusMessage: 'OK'
		};
		//const body = 'abc bdc adc afa aec';

		callback(error, response, body);
	};
}

describe('App', function () {
	const testCases = [
		{
			body: 'abc bdc adc afa aec',
			subtestCases: [
				{
					regex: /(a.c)/g,
					expectedMatches: ['abc', 'adc', 'aec']
				}
			]
		}
	];

	testCases.forEach(testCase => {
		// describe('Match regex against: ' + testCase.body, function () {
		describe('Matching against: ' + testCase.body, function () {
			it('Rocks!', function (done) {
				const mockRequest = makeMockRequest(testCase.body);

				const url = '';

				const regexes = testCase.subtestCases.map(subtestCase => { return subtestCase.regex; });

				const options = testCase.options || {};

				options.returnHttpResponseStatus = true;

				engine(mockRequest, url, regexes, options)
					.then(result => {
						expect(result).to.be.not.null;						// eslint-disable-line no-unused-expressions
						expect(result.httpResponseStatusCode).to.equal(200);
						expect(result.httpResponseStatusMessage).to.equal('OK');
						expect(result.regexMatchResults.length).to.equal(testCase.subtestCases.length);

						result.regexMatchResults.map((regexMatchResult, i) => {
							expect(regexMatchResult.match).to.be.deep.equal(testCase.subtestCases[i].expectedMatches);
						});
						done();
					})
					.fail(error => {
						expect(error).to.be.not.null;						// eslint-disable-line no-unused-expressions
						expect(null).to.be.not.null;						// eslint-disable-line no-unused-expressions
						done();
					})
					.done();
			});
		});
	});
});
