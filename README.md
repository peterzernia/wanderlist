# Wanderlist

Wanderlist is a full-featured, single page web application built on the Django
framework with a Reactjs frontend. The Django server is hosting the React
javascript pages while also hosting the REST API. React handles the client side
interaction with the REST API through axios requests. The entire project is
deployed on Heroku.



## Motivation

In my earlier project [Petsygram](https://github.com/peterzernia/petsygram), I relied heavily on Django templates
and barely even touched any of the Django Rest Framework. The motivation for my
next project was to make use of Django Rest Framework to make a REST API and
interact with that API in a  Single Page App (SPA). This is clearly the
direction modern web development has taken. Reactjs fit the bill for everything
I was looking to do in this web app, as well as being an exciting and popular
library. As an avid traveller and geography buff, creating an app based around
traveling and geography made perfect sense. Countries have plenty of interesting
data with which I could populate my database and REST API. Country data and
statistics is obviously something I only wanted users to have read access to, so
to add create, update, and delete functionality to this web app, I decided to
have users add and remove countries from a personalized map, using the Google
Maps API, which grew into having users write Trip Reports on trips they have
taken, tagging countries.



## Getting Started

Follow these instructions to get a copy running on your local machine for
development and testing purposes


### Prerequisites

Python 3.6, Node 10.12.0, NPM 6.4.1, Postgres, & Git


### Installing

1. Open up Terminal, and go into the directory where you want your local copy,
e.g.
```
$ cd projects
```

2. Download a copy
```
$ git clone https://github.com/peterzernia/wanderlist.git
```

3. Install a virtual environment
```
$ pip install virtualenv
```

4. Make a folder for your virtual environments e.g.
```
$ mkdir ~/venvs
```

5. Make a new virtual environment for this project
```
$ virtualenv --system-site-packages ~/venvs/wanderlist
```

6. Start the virtual environment
```
$ source ~/venvs/wanderlist/bin/activate
```

7. Generate a secret key for your Django app using
```
$ python
```
  **then**
```
>>> from django.utils.crypto import get_random_string
```
  **then**
```
>>> chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
```
  **then**
```
>>> get_random_string(50, chars)
```
  **and lastly**
```
>>> quit()
```

8. Copy this result and in your wanderlist/backend/settings.py file replace
```
SECRET_KEY = os.environ.get('COUNTRIES')
EMAIL_HOST_USER = os.environ.get('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASS')
```
  **with**
```
SECRET_KEY = 'your newly generated secret key here'
EMAIL_HOST_USER = 'your gmail username'
EMAIL_HOST_PASSWORD = 'your gmail application password'
```
More info on Gmail App Passwords [here](https://support.google.com/accounts/answer/185833?hl=en)

9. Get a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

10. Make a .env file in the project directory and add
```
REACT_APP_GOOGLE_API_KEY = 'your key here'
REACT_APP_API_URL = 'http://localhost:8000'
```
9. Create a Postgres database called 'wanderlist'

10. Create a wanderlist/backend/local_settings.py and add this with your
username for <username>,
```
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'wanderlist',
        'USER': '<username>,
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

11. Change into the directory containing 'requirements.txt'
```
$ cd wanderlist
```

12. Install the requirements
```
$ pip install -r requirements.txt
$ npm install
```

13. Make migrations to set up the database
```
$ python manage.py makemigrations
```

14. When this has completed, run the migrations
```
$ python manage.py migrate
```

15. Create a user profile to login with
```
$ python manage.py createsuperuser
```
and follow the instructions

17. Add the countries data to the database
```
$ python manage.py loaddata database.json
```

18. Run the Django server
```
$ python manage.py runserver
```

19. Open a new terminal window, change into the project directory, and run the
React server
```
$ cd projects/wanderlist
$ npm start
```

20. If there were no errors anywhere, you can now go to http://localhost:3000/
in your browser to view a local copy of Wanderlist. Any changes will be live
updated on the React server.



## REST API Reference

There exist multiple endpoints for the API, /api/v1/.
* [Countries](https://w4nderlist.herokuapp.com/api/v1/countries/) - The read-only API view for country objects. Only administrators can update this data.
* [Trip Reports](https://w4nderlist.herokuapp.com/api/v1/reports/) - The endpoint for the Trip Reports. Authenticated users can create, read, update and delete Trip Reports from the React frontend.
* [Users](https://w4nderlist.herokuapp.com/api/v1/reports/) - The read-only API view for user objects.
* Rest-auth - These views allow registration and authentication via the django-rest-auth and django-allauth packages.
* Favorite - /report/<pk>/favorite/ - GET requests from authenticated users to this custom API view toggle the users favorite status of a Trip Report



## What I learned

A lot. This project gave me an in-depth look into REST APIs as well as
experience in a more complicated, capable, and real-world development stack. I
had to learn an entirely knew language (javascript) to complete this project as
well as how to separate front and backends. I purposefully set out to write
tests and comments sooner and better than in Petsygram. I explored SQL
databases deeper than previously, using a PostgreSQL database in development
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



## Author

* **Peter Zernia** - (https://github.com/peterzernia)
