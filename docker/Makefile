user:
	docker exec -it docker_backend3_1 npm --prefix=/usr/src/app/backend run new-user

mongo:
	docker exec -it docker_mongodb_1 mongo timed

import-data:
	docker exec docker_backend3_1 npm --prefix=/usr/src/app/backend run docker-import
