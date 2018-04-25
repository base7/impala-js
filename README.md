# Impala API Node.js SDK
[![CircleCI](https://circleci.com/gh/GetImpala/impala-js.svg?style=svg)](https://circleci.com/gh/GetImpala/impala-js)
[![Maintainability](https://api.codeclimate.com/v1/badges/cc2ef6e1ff5bbfb051dd/maintainability)](https://codeclimate.com/github/GetImpala/impala-js/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cc2ef6e1ff5bbfb051dd/test_coverage)](https://codeclimate.com/github/GetImpala/impala-js/test_coverage)

## Installation

It's as simple as:

```bash
$ yarn add @get-impala/impala-js

# or, if you prefer

$ npm install --save @get-impala/impala-js
```

## Obtaining an API key

To use this library, you will need an Impala API key. More information can be
found in the ['Getting Started'][getting-started] section of the Impala developer documentation.

## Getting Started

After installation, you can import the API using ES6 module syntax:

```js
import Impala from 'impala-js'
```

or, alternatively, using commonJS:

```js
const Impala = require('impala-js').default
```

### Working with a single hotel

If your application will only be dealing with a single hotel at a time,
you can instantiate the Impala API like this:

```js
const hapiHotel = new Impala({
  apiKey: 'secret',
  hotelId: 'hapi'
})

hapiHotel.getBookings().then(bookings => console.log('All bookings:', bookings))
```

### Working with multiple hotels

If your application will be dealing with multiple hotels, you can omit the `hotelId`
parameter, like so:

```js
const impala = new Impala({ apiKey: 'secret' })

// You can then pass the hotelId directly to the method
impala
  .getBookings({ hotelId: 'hapi' })
  .then(bookings => console.log('All bookings:', bookings))

// Or, you can call getHotel to return a single-hotel API instance
const hapiHotel = impala.getHotel('hapi')

// You can then call the API methods like normal
hapiHotel.getBookings().then(bookings => console.log('All bookings:', bookings))
```

## Making API calls

API methods accept an object as their first argument, containing the parameters for the API call. This object can be omitted if there are no arguments to set.

API methods that take an ID have the ID as the first argument.

API methods that update a resource take the object representation of a [JSON merge patch](https://tools.ietf.org/html/rfc7386) as their second argument. 

For example:

```js
import Impala from 'impala-js'

const hapiHotel = new Impala({ apiKey: 'secret', hotelId: 'hapi' })

hapiHotel
  .getBookings()
  .then(bookings => console.log('Bookings (default date range):', bookings))

hapiHotel
  .getBookings({
    startDate: '2018-02-03',
    endDate: '2018-02-05'
  })
  .then(bookings => console.log('Bookings (for specified range):', bookings))

hapiHotel
  .getBookingById('c4be6570-15fc-4926-b339-446db4800f81')
  .then(booking => console.log('Booking', booking))
```

### Working with Promises

The API methods all return Promises, which means you can use the `.then` (and `.catch`) callbacks to handle results (and errors), _or_ you can use new `async` / `await` syntax, where supported.

```js
async function getAllHapiGuests() {
  try {
    return await hapiHotel.getGuests()
  } catch (error) {
    console.error('Something went horribly wrong!', error.stack)
  }
}
```

## API methods

| Name                    | HTTP API endpoint                                                           |
|:------------------------|:----------------------------------------------------------------------------|
| `getBookingById`        | [`GET /v1/hotel/:hotelId/booking/:bookingId`][type-booking]                 |
| `getBookings`           | [`GET /v1/hotel/:hotelId/booking`][type-booking]                            |
| `updateBookingById`     | [`PATCH /v1/hotel/:hotelId/booking/:bookingId`][type-booking]               |
| `getGuestById`          | [`GET /v1/hotel/:hotelId/guest/:guestId`][type-guest]                       |
| `getGuests`             | [`GET /v1/hotel/:hotelId/guest`][type-guest]                                |
| `getRateById`           | [`GET /v1/hotel/:hotelId/rate/:rateId`][type-rate]                          |
| `getRatePlanById`       | [`GET /v1/hotel/:hotelId/rate-plan/:ratePlanId`][type-rateplan]             |
| `getRatePlans`          | [`GET /v1/hotel/:hotelId/rate-plan`][type-rateplan]                         |
| `getRatePrices`         | [`GET /v1/hotel/:hotelId/rate/:rateId/price`][type-rateprice]               |
| `getRatePrices`         | [`GET /v1/hotel/:hotelId/rate/price`][type-rateprice]                       |
| `getRates`              | [`GET /v1/hotel/:hotelId/rate`][type-rate]                                  |
| `getRoomAvailabilities` | [`GET /v1/hotel/:hotelId/room/:roomId/availability`][type-roomavailability] |
| `getRoomAvailabilities` | [`GET /v1/hotel/:hotelId/room/availability`][type-roomavailability]         |
| `getRoomById`           | [`GET /v1/hotel/:hotelId/room/:roomId`][type-room]                          |
| `getRoomTypeAvailabilities` | [`GET /v1/hotel/:hotelId/room-type/:roomTypeId/availability`][type-roomtypeavailability] |
| `getRoomTypeAvailabilities` | [`GET /v1/hotel/:hotelId/room-type/availability`][type-roomtypeavailability]             |
| `getRoomTypeById`       | [`GET /v1/hotel/:hotelId/room-type/:roomTypeId`][type-roomtype]             |
| `getRoomTypes`          | [`GET /v1/hotel/:hotelId/room-type`][type-roomtype]                         |
| `getRooms`              | [`GET /v1/hotel/:hotelId/room`][type-room]                                  |

[getting-started]: https://docs.getimpala.com/#getting-started
[type-booking]: https://docs.getimpala.com/#booking
[type-guest]: https://docs.getimpala.com/#guest
[type-rate]: https://docs.getimpala.com/#rate
[type-rateplan]: https://docs.getimpala.com/#rate-plan
[type-rateprice]: https://docs.getimpala.com/#rate-price
[type-room]: https://docs.getimpala.com/#room
[type-roomavailability]: https://docs.getimpala.com/#room-availability
[type-roomtype]: https://docs.getimpala.com/#room-type
[type-roomtypeavailability]: https://docs.getimpala.com/#room-type-availability
