docker:
	docker-compose up

test: test-backend test-frontend

test-backend:
	docker-compose -f docker-backend-test.yml up

test-frontend:
	docker-compose -f docker-frontend-test.yml up

user:
	docker exec -it docker_backend1_1 npm --prefix=/usr/src/app/backend run new-user

mongo:
	docker exec -it docker_mongodb_1 mongo timed

import-data:
	docker exec docker_backend1_1 npm --prefix=/usr/src/app/backend run docker-import
