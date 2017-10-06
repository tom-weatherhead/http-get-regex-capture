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

		callback(error, response, body);
	};
}

describe('App', function () {
	const testCases = [
		{
			testName: 'Test 01',
			body: 'abc bdc adc afa aec',
			subtestCases: [
				{
					regex: /(a.c)/g,
					expectedMatch: 'abc',
					expectedMatches: ['abc', 'adc', 'aec']
				}
			]
		},
		{
			testName: 'Test 02',
			body: 'Fooabcbar Bazdommet footuvBar Fooxyzbar Fuzzball Fo orstbar',
			subtestCases: [
				{
					regex: /Cad(.*)usd/,
					expectedMatch: '',
					expectedMatches: []
				},
				{
					regex: /Baz(.*)met/,
					expectedMatch: 'dom',
					expectedMatches: ['dom']
				},
				{
					regex: /Foo(.*?)bar/,
					expectedMatch: 'abc',
					expectedMatches: ['abc']
				},
				{
					regex: /Cad(.*)usd/g,			// (.*) is a greedy match; (.*?) is a lazy match.
					expectedMatch: '',
					expectedMatches: []
				},
				{
					regex: /Baz(.*)met/g,
					expectedMatch: 'dom',
					expectedMatches: ['dom']
				},
				{
					regex: /Foo(.*?)bar/g,
					expectedMatch: 'abc',
					expectedMatches: ['abc', 'xyz']
				}
			]
		}
	];

	testCases.forEach(testCase => {
		// describe('Match regex against: ' + testCase.body, function () {
		describe(testCase.testName, function () {
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

						result.regexMatchResults.forEach((regexMatchResult, i) => {
							expect(regexMatchResult.match).to.be.equal(testCase.subtestCases[i].expectedMatch);
							expect(regexMatchResult.matches).to.be.deep.equal(testCase.subtestCases[i].expectedMatches);
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
