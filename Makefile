all:

run:
	@vagrant ssh -c 'cd /vagrant && make run-server'

run-server:
	tmux new-session -n timed -d 'make run-backend'
	tmux split-window -v 'make run-frontend'
	tmux -2 attach-session -d

run-backend:
	@cd ./backend && node app.js

run-frontend:
	@cd ./frontend && ember serve

mongo:
	@vagrant ssh -c mongo

install: install-frontend install-backend

install-frontend:
	cd frontend && npm install
	cd frontend && bower install

install-backend:
	cd backend && npm install
