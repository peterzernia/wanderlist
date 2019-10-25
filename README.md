# Wanderlist
![](https://travis-ci.com/peterzernia/wanderlist.svg?branch=master)

Wanderlist is a responsive, single-page travel web application built on the Django
framework with a Reactjs frontend. Users can create a custom map of all the countries they have traveled to, as well as write Trip Reports about their travels.

Now available on [Google Play](https://play.google.com/store/apps/details?id=dev.wanderlist.wanderlist)

## Development

Create backend/local_settings.py and frontend/.env files for development from their respective .dist files
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

The Django dev server is now available at localhost:8000, and the React dev server is available at localhost:3000.

Unit Test:

```
make test
```

Stop and remove the docker containers:

```
make clean
```

## REST API

The API endpoints are available at /api/v1/. The token refers to the token returned from authentication.

- GET countries/  
  Response:
  200 OK

  ```
  [
    {
        "id": 1,
        "currencies": [
            {
                "code": "AFN",
                "name": "Afghan afghani",
                "symbol": "Afs"
            }
        ],
        "languages": [
            {
                "iso639_1": "ps",
                "name": "Pashto",
                "native_name": "پښتو"
            },
            {
                "iso639_1": "tk",
                "name": "Turkmen",
                "native_name": "Türkmen, Түркмен"
            },
            {
                "iso639_1": "uz",
                "name": "Uzbek",
                "native_name": "zbek, Ўзбек, أۇزبېك‎"
            }
        ],
        "regional_blocs": [
            {
                "acronym": "SAARC",
                "name": "South Asian Association for Regional Cooperation",
                "other_acronyms": null,
                "other_names": null
            }
        ],
        "name": "Afghanistan",
        "top_level_domain": [
            ".af"
        ],
        "alpha2code": "AF",
        "alpha3code": "AFG",
        "calling_codes": [
            "93"
        ],
        "capital": "Kabul",
        "alt_spellings": [
            "AF",
            "Afġānistān"
        ],
        "region": "Asia",
        "subregion": "Southern Asia",
        "population": 27657145,
        "latlng": [
            33.0,
            65.0
        ],
        "demonym": "Afghan",
        "area": 652230.0,
        "gini": 27.8,
        "timezones": [
            "UTC+04:30"
        ],
        "borders": [
            "IRN",
            "PAK",
            "TKM",
            "UZB",
            "TJK",
            "CHN"
        ],
        "native_name": "افغانستان",
        "numeric_code": "004",
        "flag": "https://raw.githubusercontent.com/peterzernia/flags/master/af.png",
        "cioc": "AFG"
    },...
  ]
  ```

- GET reports/  
  Response:
  200 OK

  ```
  {
    "count": 12,
    "next": "http://www.wanderlist.dev/api/v1/reports/?page=2",
    "previous": null,
    "results": [
      ...
    ]
  }
  ```

- POST reports/  
  Request:

  ```
  headers: {
    "Authorization": `Token ${token}`
  }

  body: {
    title: "Trip Report",
    content: "Example Trip Report",
    author: 1,
    countries: 2,
  }
  ```

  Response:
  201 Created

  ```
  {
    "id": 39,
    "author": {
      "pk": 1,
      "username": "peterzernia",
      "email": "peter176@gmail.com",
      "countries": [
        ...
      ],
      "home": {
        ...
      },
      "biography": "Test"
    },
    "countries": [
      ...
    ],
    "favoriters": [

    ],
    "title": "Trip Report",
    "content": "Example Trip Report",
    "date_posted": "2019-08-30T13:02:46.333552Z",
    "slug": "wxLtMRirkBtS"
  }
  ```

- PATCH reports/:id  
  Request:

  ```
  headers: {
    "Authorization": `Token ${token}`
  }

  body: {
    "title": "Trip Report Updated",
  }
  ```

  Response:
  200 OK

  ```
  {
    "id": 39,
    "author": {
      "pk": 1,
      "username": "peterzernia",
      "email": "peter176@gmail.com",
      "countries": [
        ...
      ]
    }
    "title": "Trip Report Updated",
    ...
  }
  ```

- GET reports/:id/favorite/  
  Request:

  ```
  headers: {
    "Authorization": `Token ${token}`
  }
  ```

  Response:
  200 OK

  ```
  {
    author: {
      pk: 1,
      username: "peterzernia",
      email: "peter176@gmail.com"
      ...
    },
    content: "Trip Report Example",
    countries: [{…}],
    date_posted: "2019-08-23T08:40:39Z",
    favoriters: [1],
  }
  ```

- GET users/?search=peterzernia  
  Response:
  200 OK

  ```
  [
    {
        "pk": 1,
        "username": "peterzernia",
        ...
    }
  ]
  ```

- Authentication follows the [Django Rest Auth](https://github.com/Tivix/django-rest-auth) endpoints

## Built With

- [Django](https://www.djangoproject.com/) - Web Framework
- [React](https://reactjs.org/) - JS
- [Postgres](https://www.postgresql.org/) - Database
- [Docker](https://www.docker.com/) - Development Container
- [Travis CI](https://travis-ci.com/) - Continuous Integration/Testing & Deployment
- [Heroku](https://heroku.com/) - Hosting

## Author

- **Peter Zernia** - (https://github.com/peterzernia)
