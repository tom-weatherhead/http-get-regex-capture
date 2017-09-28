// http-get-regex-capture/test/engine_spec.js

'use strict';

const engine = require('../src/engine.js');

const chai = require('chai');
const expect = chai.expect;

// testHarness('https://nodejs.org/en/', [/Download v(\S+)\s+Current/]);
// testHarness('https://www.ruby-lang.org/en/downloads/', [/The current stable version is (\S+)\.\s+Please/]);

describe('App', function () {
	describe('Match /(a.c)/g against: abc bdc adc afa aec', function () {
		it('Rocks!', function (done) {
			const mockRequest = (url, callback) => {
				const error = null;
				const response = null;
				const body = 'abc bdc adc afa aec';

				callback(error, response, body);
			};

			const url = '';

			const regexes = [
				/(a.c)/g
			];

			const options = {
				returnedMatchesAreAlwaysLists: false,
				returnHttpResponseBody: false,
				returnMatchObject: false
			};

			engine(mockRequest, url, regexes, options)
				.then(result => {
					expect(result).to.be.not.null;						// eslint-disable-line no-unused-expressions
					expect(result.length).to.equal(1);						// eslint-disable-line no-unused-expressions
					expect(result[0].match).to.be.not.null;						// eslint-disable-line no-unused-expressions
					expect(result[0].match.length).to.equal(3);						// eslint-disable-line no-unused-expressions
					expect(result[0].match[0]).to.equal('abc');						// eslint-disable-line no-unused-expressions
					expect(result[0].match[1]).to.equal('adc');						// eslint-disable-line no-unused-expressions
					expect(result[0].match[2]).to.equal('aec');						// eslint-disable-line no-unused-expressions
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
