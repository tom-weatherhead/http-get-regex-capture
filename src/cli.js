#!/usr/bin/env node

// http-get-regex-capture/src/cli.js

'use strict';

const matchRegexesInWebPage = require('..');

const targetName = process.argv.length > 2 && process.argv[2];

function printTargetLatestVersion (url, regexes) {
	matchRegexesInWebPage(url, regexes)
		.then(result => {
			if (!result) {
				console.error('printTargetLatestVersion: Error: result is null.');
			} else if (!result.regexMatchResults) {
				console.error('printTargetLatestVersion: Error: result.regexMatchResults is null.');
			} else if (result.regexMatchResults.length !== 1) {
				console.error('printTargetLatestVersion: Error: The length of result.regexMatchResults is', result.regexMatchResults.length, 'rather than 1.');
			} else if (!result.regexMatchResults[0].match) {
				console.error('printTargetLatestVersion: Error: result.regexMatchResults[0].match is null.');
			} else {
				console.log(result.regexMatchResults[0].match);
			}
		}).fail(error => {
			console.error('printTargetLatestVersion: Error:', error);
		})
		.done();
}

switch (targetName) {
	case 'angular':
		printTargetLatestVersion('https://npmjs.com/packages/@angular/core', [/\<strong\>([0-9\.]+)\<\/strong\>\s*\r{0,1}\n\s*is the latest/]);
		break;

	case 'node':
		printTargetLatestVersion('https://nodejs.org/en/', [/Download v{0,1}(\S+)\s+Current/]);
		break;

	case 'ruby':
		printTargetLatestVersion('https://www.ruby-lang.org/en/downloads/', [/The current stable version is (\S+)\.\s+Please/]);
		break;

	default:
		console.error('Usage: thaw-latest-version-of [ node | ruby ]');
}
