all: build

build: cache-clean install-frontend
	cd ./frontend && ember build --environment=production

pull:
	git pull

update: pull build

cache-clean:
	npm cache clean
	bower cache clean

user:
	@vagrant ssh -c 'node --harmony /vagrant/backend/bin/user.js'

run:
	@vagrant ssh -c 'cd /vagrant && make run-server-polling'

run-server:
	tmux new-session -n timed -d 'make run-backend'
	tmux set remain-on-exit on
	tmux split-window -v 'make run-frontend'
	tmux bind-key R respawn-pane
	tmux -2 attach-session -d

run-server-polling:
	tmux new-session -n timed -d 'make run-backend'
	tmux set remain-on-exit on
	tmux split-window -v 'make run-frontend-polling'
	tmux bind-key R respawn-pane
	tmux -2 attach-session -d

run-backend:
	@cd ./backend && nodemon app.js

run-frontend:
	@cd ./frontend && ember serve --port 4200

run-frontend-polling:
	@cd ./frontend && ember serve --port 4200 \
	                              --watcher polling

mongo:
	@vagrant ssh -c mongo

install: cache-clean install-frontend install-backend

install-frontend:
	rm -rf frontend/tmp frontend/node_modules frontend/bower_components
	cd frontend && npm install
	cd frontend && bower install

install-backend:
	rm -rf backend/node_modules
	cd backend && npm install

test:
	cd frontend && ember test --server
