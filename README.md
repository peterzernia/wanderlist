# Wanderlist

Wanderlist is a full-featured, single-page web application built on the Django
framework with a Reactjs frontend.

Now available on the [Google Play](https://play.google.com/store/apps/details?id=dev.wanderlist.wanderlist)

## Development

Create a backend/local_settings.py and frontend/.env file for development from their respective .dist files
and fill them out with the appropriate environment variables.

Build the docker containers and install dependencies:

```
make build
```

Set up the database:

```
make init
```

Start the servers:

```
make up
```

The Django dev server is now available at localhost:8000, and the React dev server
is available at localhost:3000.

Stop and remove the docker containers:

```
make clean
```

## REST API

The API endpoints are available at /api/v1/.

- [Countries](https://www.wanderlist.dev/api/v1/countries/) - The
  read-only API view for country objects. Only administrators can update this
  data, but GET requests can be made with a search parameter of a country name or
  language, e.g. /api/v1/countries/?search=Aland&Islands. This endpoint returns
  case-insensitive, partial matches. A query of /api/v1/countries/?search=united
  will return the countries United Republic of Tanzania, United Arab Emirites,
  United Kingdom, and United States of America.

- [Trip Reports](https://www.wanderlist.dev/api/v1/reports/) - The
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

- [Users](https://www.wanderlist.dev/api/v1/users/) - The read-only API
  view for users. GET requests can be made with the exact match username, e.g.
  /api/v1/users/?search=peterzernia.

- Rest-auth - These views allow authentication, registration and password reset
  request via the django-rest-auth and django-allauth packages.
  POST requests made to /api/v1/rest-auth/login/ return an authentication token. This
  token is stored in the browsers localStorage, and used to check authentication, and
  POST, PUT, and DELETE trip reports. POST requests to /login/ require the username
  and password passed in as data. POST requests to /registration/ require username,
  email, password, verified password, and home country pk to be passed in. GET
  requests to /user/ returns the authenticated user object. POST requests to
  /api/v1/rest-auth/password/reset/ will send an email to the email address that
  was posted giving instructions on how to reset the password.

- Favorite - /report/tripReport_pk/favorite/ - GET requests from authenticated
  users to this custom API view toggle the users favorite status of a Trip Report.
  GET requests returns the Trip Report object with the updated favoriters. For
  example,if the favoriters of Trip Report number 12 is an array of the pks [2, 3]
  and the user with pk number 1 makes a GET request to /report/12/favorite/, it
  will return the same trip report object, but the favoriters array will now be
  [1, 2, 3]. GET requests also must include the authentication token in the
  headers.

## Built With

- [Django](https://www.djangoproject.com/) - Web Framework
- [React](https://reactjs.org/) - JS
- [Postgres](https://www.postgresql.org/) - Database
- [Docker](https://www.docker.com/) - Development Container
- [Travis CI](https://travis-ci.com/) - Continuous Integration/Testing & Deployment
- [Heroku](https://heroku.com/) - Hosting

## Author

- **Peter Zernia** - (https://github.com/peterzernia)
