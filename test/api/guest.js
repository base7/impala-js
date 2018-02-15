import { expect } from 'chai'
import nock from 'nock'
import { getGuests, getGuestByID } from '../../src/api/guest'

describe('getGuests', () => {
  let scope
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
        'X-API-Key': 'testToken'
      }
    })
      .get('/v1/hotel/HOTEL/guest')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelID/guest endpoint', async () => {
    await getGuests({ apiKey: 'testToken', hotelID: 'HOTEL' })
    expect(scope.isDone()).to.equal(true)
  })
})

describe('getGuestByID', () => {
  let scope
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
        'X-API-Key': 'testToken'
      }
    })
      .get('/v1/hotel/HOTEL/guest/GUEST')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelID/guest/:guestID endpoint', async () => {
    await getGuestByID({
      apiKey: 'testToken',
      hotelID: 'HOTEL',
      guestID: 'GUEST'
    })
    expect(scope.isDone()).to.equal(true)
  })
})
