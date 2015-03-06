
test:
	@NODE_ENV=testing POST=3333 ./node_modules/.bin/babel-node \
		node_modules/.bin/isparta cover \
		node_modules/mocha/bin/_mocha

travis:
	@NODE_ENV=testing POST=3333 ./node_modules/.bin/babel-node \
		node_modules/.bin/isparta cover \
		node_modules/mocha/bin/_mocha \
			--report lcovonly \
			-- \
			-R spec

.PHONY: test
