all: build

build: cache-clean install-frontend
	cd ./frontend && ember build --environment=production

pull:
	git pull

update: pull deps-clean build install-backend

cache-clean:
	npm cache clean
	bower cache clean

deps-clean:
	rm -rf node_modules
	rm -rf backend/node_modules
	rm -rf frontend/node_modules
	rm -rf frontend/bower_components
	rm -rf frontend/tmp

user:
	@vagrant ssh -c 'node --harmony /vagrant/backend/bin/user.js'

run:
	@vagrant ssh -c 'cd /vagrant && make run-server-polling'

run-server:
	tmux new-session -n timed-dev -d 'make run-backend'
	tmux set remain-on-exit on
	tmux bind-key R respawn-pane
	tmux split-window -v 'make run-frontend'
	tmux -2 attach-session -d

run-test-server:
	tmux new-session -n timed-test -d 'make -C ./backend test-watch'
	tmux set remain-on-exit on
	tmux bind-key R respawn-pane
	tmux split-window -v 'cd ./frontend && ember test --server'
	tmux -2 attach-session -d

run-server-polling:
	tmux new-session -n timed-dev -d 'make run-backend'
	tmux set remain-on-exit on
	tmux bind-key R respawn-pane
	tmux split-window -v 'make run-frontend-polling'
	tmux -2 attach-session -d

run-backend:
	@make -C backend run

run-frontend:
	@cd ./frontend && ember serve --port 4200 --proxy http://localhost:3000/

run-frontend-polling:
	@cd ./frontend && ember serve --port 4200 \
	                              --watcher polling

mongo:
	@vagrant ssh -c mongo

install: cache-clean install-frontend install-backend
	npm install

install-frontend:
	cd frontend && npm install
	cd frontend && bower install

install-backend:
	cd backend && npm install

outdated:
	cd frontend && bower list
	cd frontend && npm outdated -depth 0
	cd backend && npm outdated -depth 0

test-server:
	cd frontend && ember test --server

test:
	make test -C ./backend
	npm test --prefix ./frontend

travis:
	make travis -C ./backend
	npm test --prefix ./frontend
	# TODO: merge blanket lcov
	./node_modules/.bin/lcov-result-merger ./backend/coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js || true
