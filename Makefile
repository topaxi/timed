all: install

install: install-frontend install-backend

install-frontend:
	cd frontend && npm install
	cd frontend && bower install

install-backend:
	cd backend && npm install
