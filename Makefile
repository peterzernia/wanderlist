build:
	docker-compose build
	cd frontend && docker-compose build
	cd frontend && docker-compose run frontend npm install
	cd frontend && docker-compose run frontend npm run build

init:
	docker-compose run web python manage.py migrate --noinput
	docker-compose run web python manage.py createsuperuser
	docker-compose run web python manage.py loaddata database.json

up:
	docker-compose up --d
	cd frontend && docker-compose up

clean:
	docker-compose stop
	docker-compose rm -fva
	cd frontend && docker-compose stop
	cd frontend && docker-compose rm -fva
