all: build

build:
	cd ./frontend && ember build --environment=production

user:
	@vagrant ssh -c 'node /vagrant/backend/bin/user.js'

run:
	@vagrant ssh -c 'cd /vagrant && make run-server-polling'

run-server:
	tmux new-session -n timed -d 'make run-backend'
	tmux split-window -v 'make run-frontend'
	tmux -2 attach-session -d

run-server-polling:
	tmux new-session -n timed -d 'make run-backend'
	tmux split-window -v 'make run-frontend-polling'
	tmux -2 attach-session -d

run-backend:
	@cd ./backend && node --harmony app.js

run-frontend:
	@cd ./frontend && ember serve --port 4200

run-frontend-polling:
	@cd ./frontend && ember serve --port 4200 \
	                              --watcher polling

mongo:
	@vagrant ssh -c mongo

install: install-frontend install-backend

install-frontend:
	cd frontend && npm install
	cd frontend && bower install

install-backend:
	cd backend && npm install

test:
	cd frontend && ember test --server
