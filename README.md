# Wanderlist

Wanderlist is a full-featured, single-page web application built on the Django
framework with a Reactjs frontend.

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

Integration/E2E test:

```
make cy-run
```

Stop and remove the docker containers:

```
make clean
```

## REST API

The API endpoints are available at /api/v1/.

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
    'Authorization': `Token ${token}`
  }

  body: {
    title: 'Trip Report',
    content: 'Example Trip Report',
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
        {
          "id": 4,
          "currencies": [
            {
              "code": "DZD",
              "name": "Algerian dinar",
              "symbol": "\u062f.\u062c"
            }
          ],
          "languages": [
            {
              "iso639_1": "ar",
              "name": "Arabic",
              "native_name": "\u0627\u0644\u0639\u0631\u0628\u064a\u0629"
            }
          ],
          "regional_blocs": [
            {
              "acronym": "AU",
              "name": "African Union",
              "other_acronyms": null,
              "other_names": null
            },
            {
              "acronym": "AL",
              "name": "Arab League",
              "other_acronyms": null,
              "other_names": [
                "\u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u062f\u0648\u0644 \u0627\u0644\u0639\u0631\u0628\u064a\u0629",
                "J\u0101mi\u02bbat ad-Duwal al-\u02bbArab\u012byah",
                "League of Arab States"
              ]
            }
          ],
          "name": "Algeria",
          "top_level_domain": [
            ".dz"
          ],
          "alpha2code": "DZ",
          "alpha3code": "DZA",
          "calling_codes": [
            "213"
          ],
          "capital": "Algiers",
          "alt_spellings": [
            "DZ",
            "Dzayer",
            "Alg\u00e9rie"
          ],
          "region": "Africa",
          "subregion": "Northern Africa",
          "population": 40400000,
          "latlng": [
            28,
            3
          ],
          "demonym": "Algerian",
          "area": 2381741,
          "gini": 35.3,
          "timezones": [
            "UTC+01:00"
          ],
          "borders": [
            "TUN",
            "LBY",
            "NER",
            "ESH",
            "MRT",
            "MLI",
            "MAR"
          ],
          "native_name": "\u0627\u0644\u062c\u0632\u0627\u0626\u0631",
          "numeric_code": "012",
          "flag": "https:\/\/restcountries.eu\/data\/dza.svg",
          "cioc": "ALG"
        },
        {
          "id": 5,
          "currencies": [
            {
              "code": "USD",
              "name": "United States dollar",
              "symbol": "US$"
            }
          ],
          "languages": [
            {
              "iso639_1": "en",
              "name": "English",
              "native_name": "English"
            },
            {
              "iso639_1": "sm",
              "name": "Samoan",
              "native_name": "gagana faa Samoa"
            }
          ],
          "regional_blocs": [

          ],
          "name": "American Samoa",
          "top_level_domain": [
            ".as"
          ],
          "alpha2code": "AS",
          "alpha3code": "ASM",
          "calling_codes": [
            "1684"
          ],
          "capital": "Pago Pago",
          "alt_spellings": [
            "AS",
            "Amerika S\u0101moa",
            "Amelika S\u0101moa",
            "S\u0101moa Amelika"
          ],
          "region": "Oceania",
          "subregion": "Polynesia",
          "population": 57100,
          "latlng": [
            -14.33333333,
            -170
          ],
          "demonym": "American Samoan",
          "area": 199,
          "gini": null,
          "timezones": [
            "UTC-11:00"
          ],
          "borders": [

          ],
          "native_name": "American Samoa",
          "numeric_code": "016",
          "flag": "https:\/\/restcountries.eu\/data\/asm.svg",
          "cioc": "ASA"
        },
        {
          "id": 213,
          "currencies": [
            {
              "code": "EUR",
              "name": "European Euro",
              "symbol": "\u20ac"
            }
          ],
          "languages": [
            {
              "iso639_1": "es",
              "name": "Spanish",
              "native_name": "espa\u00f1ol, castellano"
            }
          ],
          "regional_blocs": [
            {
              "acronym": "EU",
              "name": "European Union",
              "other_acronyms": null,
              "other_names": null
            }
          ],
          "name": "Spain",
          "top_level_domain": [
            ".es"
          ],
          "alpha2code": "ES",
          "alpha3code": "ESP",
          "calling_codes": [
            "34"
          ],
          "capital": "Madrid",
          "alt_spellings": [
            "ES",
            "Kingdom of Spain",
            "Reino de Espa\u00f1a"
          ],
          "region": "Europe",
          "subregion": "Southern Europe",
          "population": 46438422,
          "latlng": [
            40,
            -4
          ],
          "demonym": "Spanish",
          "area": 505992,
          "gini": 34.7,
          "timezones": [
            "UTC",
            "UTC+01:00"
          ],
          "borders": [
            "AND",
            "FRA",
            "GIB",
            "PRT",
            "MAR"
          ],
          "native_name": "Espa\u00f1a",
          "numeric_code": "724",
          "flag": "https:\/\/restcountries.eu\/data\/esp.svg",
          "cioc": "ESP"
        }
      ],
      "home": {
        "id": 6,
        "currencies": [
          {
            "code": "EUR",
            "name": "European Euro",
            "symbol": "\u20ac"
          }
        ],
        "languages": [
          {
            "iso639_1": "ca",
            "name": "Catalan",
            "native_name": "Catal\u00e0"
          }
        ],
        "regional_blocs": [

        ],
        "name": "Andorra",
        "top_level_domain": [
          ".ad"
        ],
        "alpha2code": "AD",
        "alpha3code": "AND",
        "calling_codes": [
          "376"
        ],
        "capital": "Andorra la Vella",
        "alt_spellings": [
          "AD",
          "Principality of Andorra",
          "Principat d'Andorra"
        ],
        "region": "Europe",
        "subregion": "Southern Europe",
        "population": 78014,
        "latlng": [
          42.5,
          1.5
        ],
        "demonym": "Andorran",
        "area": 468,
        "gini": null,
        "timezones": [
          "UTC+01:00"
        ],
        "borders": [
          "FRA",
          "ESP"
        ],
        "native_name": "Andorra",
        "numeric_code": "020",
        "flag": "https:\/\/restcountries.eu\/data\/and.svg",
        "cioc": "AND"
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
    'Authorization': `Token ${token}`
  }

  body: {
    title: 'Trip Report Updated',
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
    ...
  }
  ```

- GET reports/:id/favorite/
  Request:

  ```
  headers: {
    'Authorization': `Token ${token}`
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
