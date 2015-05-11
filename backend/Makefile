run:
	npm run watch

test:
	NODE_ENV=testing \
	MONGO_DB=timed-testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp test

lint:
	NODE_ENV=testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp lint

test-watch:
	NODE_ENV=testing \
	MONGO_DB=timed-testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp test-watch

travis:
	NODE_ENV=testing \
	MONGO_DB=timed-testing \
		node_modules/.bin/babel-node --harmony \
		node_modules/.bin/gulp travis
	cat coverage/lcov.info | ../node_modules/coveralls/bin/coveralls.js || true

travis-install:
	npm install

travis-before:
travis-after:

.PHONY: test
