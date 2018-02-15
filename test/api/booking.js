import { expect } from 'chai'
import nock from 'nock'
import { getBookings, getBookingByID } from '../../src/api/booking'

describe('getBookings', () => {
  let scope, result
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
        'X-API-Key': 'testToken'
      }
    })
      .get('/v1/hotel/HOTEL/booking')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelID/booking endpoint', async () => {
    await getBookings({ apiKey: 'testToken', hotelID: 'HOTEL' })
    expect(scope.isDone()).to.equal(true)
  })
})

describe('getBookingByID', () => {
  let scope, result
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
        'X-API-Key': 'testToken'
      }
    })
      .get('/v1/hotel/HOTEL/booking/BOOKING')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelID/booking/:bookingID endpoint', async () => {
    await getBookingByID({
      apiKey: 'testToken',
      hotelID: 'HOTEL',
      bookingID: 'BOOKING'
    })
    expect(scope.isDone()).to.equal(true)
  })
})
