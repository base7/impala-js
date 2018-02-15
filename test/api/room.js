import { expect } from 'chai'
import nock from 'nock'
import { getRooms, getRoomByID } from '../../src/api/room'

describe('getRooms', () => {
  let scope
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
        'X-API-Key': 'testToken'
      }
    })
      .get('/v1/hotel/HOTEL/room')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelID/room endpoint', async () => {
    await getRooms({ apiKey: 'testToken', hotelID: 'HOTEL' })
    expect(scope.isDone()).to.equal(true)
  })
})

describe('getRoomByID', () => {
  let scope
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
        'X-API-Key': 'testToken'
      }
    })
      .get('/v1/hotel/HOTEL/room/ROOM')
      .reply(200, { test: 'success' })
  })

  afterEach(() => {
    scope.done()
  })

  it('should call the GET /hotel/:hotelID/room/:roomID endpoint', async () => {
    await getRoomByID({
      apiKey: 'testToken',
      hotelID: 'HOTEL',
      roomID: 'ROOM'
    })
    expect(scope.isDone()).to.equal(true)
  })
})
