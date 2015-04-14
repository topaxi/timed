run:
	npm run watch

test:
	NODE_ENV=testing \
	MONGODB=mongodb://127.0.0.1/timed-testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp test

lint:
	NODE_ENV=testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp lint

test-watch:
	NODE_ENV=testing \
	MONGODB=mongodb://127.0.0.1/timed-testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp test-watch

travis:
	NODE_ENV=testing \
	MONGODB=mongodb://127.0.0.1/timed-testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp travis

.PHONY: test
