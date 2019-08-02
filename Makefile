build:
	docker-compose build
	cd frontend && docker-compose build
	cd frontend && docker-compose run frontend npm install
	cd frontend && docker-compose run frontend npm run build

init:
	docker-compose run web python manage.py migrate --noinput
	docker-compose run web python manage.py createsuperuser
	docker-compose run web python manage.py loaddata database.json

migrate:
	docker-compose run web python manage.py makemigrations
	docker-compose run web python manage.py migrate

up:
	docker-compose up -d
	cd frontend && docker-compose up

test-js:
	cd frontend && docker-compose run frontend npm test

test-py:
	docker-compose run web coverage run manage.py test

test: test-py test-js

cy-open:
	cd frontend && docker-compose run frontend ./node_modules/.bin/cypress install && ./node_modules/.bin/cypress open

cy-run:
	cd frontend && docker-compose run frontend ./node_modules/.bin/cypress install && ./node_modules/.bin/cypress run

clean:
	docker-compose stop
	docker-compose rm -fv
	cd frontend && docker-compose stop
	cd frontend && docker-compose rm -fv
