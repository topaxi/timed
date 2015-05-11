docker:
	docker-compose up

test: test-backend test-frontend

test-backend: install-backend
	docker-compose -f docker-backend-test.yml up

test-frontend: install-frontend
	docker-compose -f docker-frontend-test.yml up

install-backend: install-root
	make -C /usr/src/app install-backend

install-frontend: install-root
	npm install bower -g
	make -C /usr/src/app install-frontend

install-root:
	npm install --prefix=/usr/src/app

run-backend: install-backend
	npm run --prefix=/usr/src/app/backend watch

run-frontend: install-frontend
	npm run --prefix=/usr/src/app/frontend start

user:
	docker exec -it docker_backend1_1 npm --prefix=/usr/src/app/backend run new-user

mongo:
	docker exec -it docker_mongodb_1 mongo timed

import-data:
	docker exec docker_backend1_1 npm --prefix=/usr/src/app/backend run docker-import
