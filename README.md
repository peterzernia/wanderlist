# Wanderlist

Wanderlist is a full-featured, single-page web application built on the Django
framework with a Reactjs frontend. The Django server is hosting the React
javascript pages while also hosting the REST API. React handles the client side
interaction with the REST API through axios requests. The entire project is
deployed on Heroku.



## Motivation

In my earlier project [Petsygram](https://github.com/peterzernia/petsygram), I
relied heavily on Django templates and barely even touched any of the Django
Rest Framework. The motivation for my next project was to make use of Django
Rest Framework to make a REST API and interact with that API in a Single-Page
App (SPA). SPAs are one of the directions modern web development has taken, and
it seems very important to learn how to build them. Reactjs fit the bill for
everything I was looking to do in this web app, as well as being an exciting and
popular library. As an avid traveller and geography buff, creating an app based
around traveling and geography made perfect sense. Countries have plenty of
interesting data with which I could populate my database and REST API. Country
data is obviously something I only wanted users to have read access to, so
to add create, update, and delete functionality to this web app, I decided to
have users add and remove countries from a personalized map, using the Google
Maps API, which expanded into having users write Trip Reports on trips they have
taken, tagging countries. Finally, I wanted to add image upload to this project.
I had images in my last project as well, but I served the images from the
/media/ folder in Django. This time, I wanted to use AWS S3 to learn how, and
make this project more scalable. I even set up Docker containers to to set up a
standard development environment.



## Getting Started

Follow these instructions to get a copy running on your local machine for
development and testing purposes


### Prerequisites

Docker & Git


### Installing

1. Open up Terminal, and change into the directory where you want your local copy,
e.g.
```
$ cd projects
```

2. Download a copy
```
$ git clone https://github.com/peterzernia/wanderlist.git
```

3. Build the first Docker image
```
$ cd wanderlist
$ docker-compose build
```

4. Create a local_settings.py file for development
```
$ touch backend/local_settings.py
```

5. Generate a secret key for your Django app using
```
$ python
>>> from django.utils.crypto import get_random_string
>>> chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
>>> get_random_string(50, chars)
>>> quit()
```

6. In the wanderlist/backend/settings.py file add
```
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'db',
        'PORT': '5432',
    }
}

SECRET_KEY = 'secret key generated with python'
EMAIL_USER = 'your email username'
EMAIL_PASS = 'your gmail app password'
AWS_STORAGE_BUCKET_NAME = 'your aws bucket name'
AWS_ACCESS_KEY_ID = 'your aws bucket access key id'
AWS_SECRET_ACCESS_KEY = 'your aws bucket secret access key'

MEDIAFILES_LOCATION = 'media'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
MEDIA_URL = "https://%s/%s/" % (AWS_S3_CUSTOM_DOMAIN, MEDIAFILES_LOCATION)

```
More info on Gmail App Passwords [here](https://support.google.com/accounts/answer/185833?hl=en)
More info on AWS S3 [here](https://aws.amazon.com/s3/)

7. Get a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

8. Make a .env file in the project directory and add the REACT_APP variables
```
$ touch frontend/.env
```
```
REACT_APP_GOOGLE_API_KEY= 'your google maps api key here'
REACT_APP_API_URL= 'http://localhost:8000'
```

9. Setup database & admin user. Note: if Postgres or another database, etc. is
running locally on port 5432, you will need to suspend that.
```
$ docker-compose run web python manage.py migrate --noinput
$ docker-compose run web python manage.py createsuperuser
$ docker-compose run web python manage.py loaddata database.json
```

10. Run the docker container
```
$ docker-compose up
```

11. While the backend server is running, open a second terminal window and change directories to frontend/
```
$ cd frontend
```

12. Build the second Docker image for the frontend server
```
$ docker-compose build
```

13. Build the frontend JS
```
$ docker-compose run frontend npm install
$ docker-compose run frontend npm run build
```

14. Run the second Docker container
```
$ docker-compose up
```

15. If there were no errors anywhere, you can now go to http://localhost:3000/
in your browser to view a local copy of Wanderlist. Any changes will be live
updated on the React server. The REST API is hosted on http://localhost:8000/.



## REST API Endpoint Reference

There exist multiple endpoints for the API, /api/v1/.

* [Countries](https://w4nderlist.herokuapp.com/api/v1/countries/) - The
read-only API view for country objects. Only administrators can update this
data, but GET requests can be made with a search parameter of a country name or
language, e.g. /api/v1/countries/?search=Aland&Islands. This endpoint returns
case-insensitive, partial matches. A query of /api/v1/countries/?search=united
will return the countries United Republic of Tanzania, United Arab Emirites,
United Kingdom, and United States of America.

* [Trip Reports](https://w4nderlist.herokuapp.com/api/v1/reports/) - The
endpoint for the Trip Reports. Authenticated users can create, read, update and
delete Trip Reports from the React frontend. GET requests are
paginated to three trip reports and are ordered by favorite
count, but can also be ordered by primary key, i.e. /api/v1/reports/?ordering=pk.
The second page would be viewable at /api/v1/reports/?ordering=pk&page=2. Search
parameters for an exact match on a username, exact match on the trip report
slug, and case-insensitive partial match for countries of the trip report can
also be made, e.g. /api/v1/reports/?search=peterzernia. POST requests to this
endpont require the authentication token returned from the rest-auth endpoints
to be sent in the request header, i.e.
```
axios.post(
  `/api/v1/reports/`, data,{
    headers: {
      'Authorization': `Token ${token}`
    }
  }
)
```
along with the required fields, title, content, authors, and countries. The
image field is optional. PUT, PATCH, and DELETE requests must be made to the
specific trip report endpoint of /api/v1/reports/tripReport_pk/, e.g.
/api/v1/reports/12/ and require the same headers as POST.

* [Users](https://w4nderlist.herokuapp.com/api/v1/users/) - The read-only API
view for users. GET requests can be made with the exact match username, e.g.
/api/v1/users/?search=peterzernia.

* Rest-auth - These views allow authentication, registration and password reset
request via the django-rest-auth and django-allauth packages.
POST requests made to /api/v1/rest-auth/login/ return an authentication token. This
token is stored in the browsers localStorage, and used to check authentication, and
POST, PUT, and DELETE trip reports. POST requests to /login/ require the username
and password passed in as data. POST requests to /registration/ require username,
email, password, verified password, and home country pk to be passed in. GET
requests to /user/ returns the authenticated user object. POST requests to
/api/v1/rest-auth/password/reset/ will send an email to the email address that
was posted giving instructions on how to reset the password.

* Favorite - /report/tripReport_pk/favorite/ - GET requests from authenticated
users to this custom API view toggle the users favorite status of a Trip Report.
GET requests returns the Trip Report object with the updated favoriters. For
example,if the favoriters of Trip Report number 12 is an array of the pks [2, 3]
and the user with pk number 1 makes a GET request to /report/12/favorite/, it
will return the same trip report object, but the favoriters array will now be
[1, 2, 3]. GET requests also must include the authentication token in the
headers.



## What I learned

A lot. This project gave me an in-depth look into REST APIs as well as
experience in a more complicated, capable, and real-world development stack. I
had to learn an entirely new language (javascript) to complete this project as
well as how to separate front and backends. I purposefully set out to write
tests and comments sooner and better than in Petsygram. I connected my project
with Travis CI to make sure I was testing my commits pushed to github I explored
SQL databases deeper than previously, using a PostgreSQL database in development
and production. I learned how to keep separate environments for development and
production. I learned how to serve my media files from Amazon S3 to make my app
more scalable than hosting in the /media/ folder. Whereas Petsygram was an
Instagram clone, with Wanderlist I had to actually design the UX. I was able to
host this project on Heroku, which I found to be a more powerful option than
PythonAnywhere. Wanderlist is a great project I can continue to build and
expand.



## Built With

* [Django](https://www.djangoproject.com/) - Web Framework
* [React](https://reactjs.org/) - JS
* [Postgres](https://www.postgresql.org/) - Database
* [Travis CI](https://travis-ci.com/) - Continuous Integration/Testing
* [Heroku](https://heroku.com/) - Deployment
* [Docker](https://www.docker.com/) - Development Container



## Author

* **Peter Zernia** - (https://github.com/peterzernia)
