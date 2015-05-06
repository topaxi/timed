.PHONY: test

test:
	ember test --server

travis:
	SAUCE_USERNAME=timed \
	SAUCE_ACCESS_KEY=ba1b1846-b9d2-4e89-98d5-5a63746a0a23 \
	ember sauce:connect
	npm test
	ember sauce:disconnect
