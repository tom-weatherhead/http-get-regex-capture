# http-get-regex-capture
Obtain text via an HTTP GET request, and then capture pieces of the text with regular expressions.

The demo app determines the latest stable versions of Node.js and Ruby by scraping their respective Websites.

Git installation and execution instructions:

- Install Git.
- Install Node.js (e.g. via [nvm](https://github.com/creationix/nvm) or [Nodist](https://github.com/marcelklehr/nodist)).
- In a terminal:

	$ npm i -g grunt
	$ git clone https://github.com/tom-weatherhead/http-get-regex-capture.git
	$ cd http-get-regex-capture
	$ npm i
	$ grunt
	$ npm start node
	$ npm start ruby

Note: The command "grunt" runs lint and security tests.

npm installation and execution instructions:

	$ npm i -g http-get-regex-capture
	$ thaw-latest-version-of node
	$ thaw-latest-version-of ruby
