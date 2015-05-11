.PHONY: test

test:
	ember test --server

travis: sauce-test

test-docker: sauce-connect sauce-test sauce-disconnect

sauce-connect:
	ember sauce:connect

sauce-test:
	npm test

sauce-disconnect:
	ember sauce:disconnect

travis-before: sauce-connect
travis-after:  sauce-disconnect

travis-install:
	npm install -g bower
	npm install
	bower install
