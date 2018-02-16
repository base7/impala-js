import { expect } from 'chai'
import nock from 'nock'
import { getBookings, getBookingById } from '../../src/api/booking'

describe('getBookings', () => {
  let scope
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken'
      }
    })
      .get('/v1/hotel/HOTEL/booking')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelId/booking endpoint', async () => {
    await getBookings({ apiKey: 'testToken', hotelId: 'HOTEL' })
    expect(scope.isDone()).to.equal(true)
  })
})

describe('getBookingById', () => {
  let scope
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken'
      }
    })
      .get('/v1/hotel/HOTEL/booking/BOOKING')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelId/booking/:bookingId endpoint', async () => {
    await getBookingById({
      apiKey: 'testToken',
      hotelId: 'HOTEL',
      bookingId: 'BOOKING'
    })
    expect(scope.isDone()).to.equal(true)
  })
})
