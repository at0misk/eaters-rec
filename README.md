# eaters-rec
This repository is for the Rec take home exercise.

## Setup
Please pull down the respository and run `npm i` to install packages.

To start the project please run `npm run dev`

## Postgres
I used a hosted Postgres instance and populated the database with the data from the Google sheet.

The values for the connection string are hard coded into the application - there should be no additional set up to connect to it.

The following is an ERD diagram of the database schema:
![Screenshot 2024-06-17 at 10 16 18 AM](https://github.com/at0misk/eaters-rec/assets/17558214/e6ec33eb-8df8-4416-b13a-1a8770373260)

## Testing
I used Postman to test the app.

There are some extra endpoints out of the scope of the original prompt, but the endpoints the prompt is concerned with are the following:

### GET localhost:3000/available-restaurants
This is a `GET` request with the following query params to retrieve available restaurants based on dietary restrictions and eater's current reservations:

* `names`: A comma seperated list of `eater` strings (i.e. `Kevin,Ben,Gob`)
* `datetime`: A timestamp representing when the eaters would like the reservation to take place (i.e. `2024-06-17T03:20:00Z`)

#### Available Restaurants Results
![Screenshot 2024-06-17 at 10 05 34 AM](https://github.com/at0misk/eaters-rec/assets/17558214/a0a2c4de-9dba-4524-bdc1-37328e9fdc9b)

#### Conflict message because eaters already have reservations
![Screenshot 2024-06-17 at 10 05 46 AM](https://github.com/at0misk/eaters-rec/assets/17558214/73b6485c-4660-4a37-a15c-e902aa2a5b40)

### POST localhost:3000/reservations
This is a `POST` request to create `reservations` records as well as `eaters_reservations` records. It accepts the following params:

* `names`: A comma seperated list of `eater` strings (i.e. `Kevin,Ben,Gob`)
* `datetime`: A timestamp representing when the eaters would like the reservation to take place (i.e. `2024-06-17T03:20:00Z`)
* `restaurant`: A string of the restaurant name (i.e. `Shells and Sauce`)

#### Reservation creation confirmation
![Screenshot 2024-06-17 at 10 03 21 AM](https://github.com/at0misk/eaters-rec/assets/17558214/04663fee-54e1-40ee-85b5-86d01004f529)
