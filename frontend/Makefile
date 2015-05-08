.PHONY: test

test:
	ember test --server

travis:
	npm test

travis-before:
	ember sauce:connect

travis-after:
	ember sauce:disconnect

travis-install:
	npm install -g bower
	npm install
	bower install
