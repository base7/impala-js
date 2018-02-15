# Impala API Node.js SDK

## Installation

It's as simple as:

```bash
$ yarn add impala-js
```

## Usage

All methods exported by the API:

* return a Promise, which will either resolve to an object or reject with an Error, _and_,
* accept a set of parameters for their first argument, and an optional set of request options for their second argument.

### Base Parameters

All methods require (at least) the following two parameters as part of their first argument:

* `apiKey`: The Impala API key to use. To obtain one, [please see the Impala API documentation][setup-developer-account].
* `hotelID`: The unique ID of the hotel that you wish to query.

To provide these by default, you can use the [`withDefaults`](#withdefaults) method to return an instance of the API with one or more of these values set by default.

### Request options

The second argument of all API methods is an optional object, containing options around how to make HTTP requests. The following keys are accepted:

 - `fetch`: The fetch API implementation to use for this request. This defaults to [node-fetch][node-fetch].
 - `baseUrl`: The Impala API base URL to use. By default, this is `https://api.getimpala.com/v1/`. This **must** have a trailing slash.
 - `headers`: An object containing additional headers to send with the HTTP request.

Any additional keys will be passed directly to the fetch method as options.

## API Methods

### `getBookings`

Gets all bookings for a specific hotel.

#### Parameters

Only requires the [base parameters][base-parameters].

#### Return value

Returns a Promise, which resolves to an array of [Booking][type-ref-booking] objects.

### `getBookingByID`

Gets a specific booking for a specific hotel.

#### Parameters

In addition to the required [base parameters][base-parameters]:

* `bookingID`: The unique of the booking that you wish to query.

#### Return value

Returns a Promise, which resolves to a [Booking][type-ref-booking] object.

### `getGuests`

Gets all guests for a specific hotel.

#### Parameters

Only requires the [base parameters][base-parameters].

#### Return value

Returns a Promise, which resolves to an array of [Guest][type-ref-guest] objects.

### `getGuestByID`

Gets a specific guest for a specific hotel.

#### Parameters

In addition to the required [base parameters][base-parameters]:

* `guestID`: The unique of the guest that you wish to query.

#### Return value

Returns a Promise, which resolves to a [Guest][type-ref-guest] object.

### `getRooms`

Gets all rooms for a specific hotel.

#### Parameters

Only requires the [base parameters][base-parameters].

### `getRoomByID`

Gets a room for a specific hotel.

#### Parameters

In addition to the required [base parameters][base-parameters]:

* `roomID`: The unique of the room that you wish to query.

## Utility Methods

### `withDefaults`

Returns an instance of impala-js's API, with method parameters and request options pre-set with specific defaults.

#### Arguments

Accepts 2 arguments:

 - An object containing _API parameter_ overrides, and
 - An optional object containing [request options](#request-options).

#### Example Usage

You can override any of the parameters accepted by API methods, as shown here:

```js
import { withDefaults } from 'impala-js'

const myHotel = withDefaults({
  apiKey: 'MY_VERY_SECRET_KEY',
  hotelID: 'MY_HOTEL_UUID'
})

myHotel
  .getGuestByID({ guestID: 'GUEST_UUID' })
  .then(guest => console.log(`Guest's name is ${guest.firstName}`))
```

You can also override the request options, as shown here:

```js
import { withDefaults } from 'impala-js'
import betterFetch from 'make-fetch-happen'

const myFetchingInstance = withDefaults({
  apiKey: 'MY_VERY_SECRET_KEY'
}, {
  fetch: betterFetch
})
```

### `makeImpalaRequest`

The underlying method used to make all requests to the Impala API.

#### Arguments

This method accepts 3 arguments:

 - The API endpoint to call, as an array, e.g. `['path', 'to', 'endpoint']`. This is converted to a URL by [`makeImpalaUrl`](#makeimpalaurl). This argument is required.
 - The API key to authenticate the request. This argument is required.
 - An object containing [request options](#request-options). This is entirely optional.

#### Example Usage

```js
import { makeImpalaRequest } from 'impala-js'

// Equivalent to using `getGuestByID`
makeImpalaRequest(['hotel', HOTEL_ID, 'guest', GUEST_ID], API_KEY)
  .then(guest => console.log(guest))
```

### `makeImpalaUrl`

Generates an Impala API URL for a given endpoint path.

#### Parameters

Accepts two parameters, both optional:

 - The endpoint path, as an array of strings. If empty, the API base URL will be returned.
 - The base URL to use. By default, this is `https://api.getimpala.com/v1/`. This URL **must** have a trailing slash.

[base-parameters]: #base-parameters
[setup-developer-account]: https://docs.getimpala.com/docs#section-setup-a-developer-account
[type-ref-booking]: https://docs.getimpala.com/docs/bookings
[type-ref-guest]: https://docs.getimpala.com/docs/guests
[type-ref-room]: https://docs.getimpala.com/docs/rooms
[node-fetch]: https://npm.im/node-fetch
