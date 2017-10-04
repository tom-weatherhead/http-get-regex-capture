#!/usr/bin/env node

// http-get-regex-capture/src/cli.js

'use strict';

const matchRegexesInWebPage = require('..');

const targetName = process.argv.length > 2 && process.argv[2];

function printTargetLatestVersion (url, regexes) {
	matchRegexesInWebPage(url, regexes)
		.then(result => {
			console.log(result.regexMatchResults[0].match);
		}).fail(error => {
			console.error('printTargetLatestVersion: Error:', error);
		})
		.done();
}

switch (targetName) {
	case 'node':
		printTargetLatestVersion('https://nodejs.org/en/', [/Download v(\S+)\s+Current/]);
		break;

	case 'ruby':
		printTargetLatestVersion('https://www.ruby-lang.org/en/downloads/', [/The current stable version is (\S+)\.\s+Please/]);
		break;

	default:
		console.error('Usage: thaw-latest-version-of [ node | ruby ]');
}
