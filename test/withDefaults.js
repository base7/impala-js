import { expect } from 'chai'
import nock from 'nock'
import * as api from '../src/api'
import withDefaults from '../src/withDefaults'

describe('withDefaults', () => {
  it('should return a copy of the API', () => {
    const expectedApiMethods = Object.keys(api)
    const actualApiMethods = Object.keys(withDefaults())
    expectedApiMethods.forEach(method => {
      expect(actualApiMethods).to.include(method)
    })
  })

  describe('when given a default apiKey', () => {
    let scope, result
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
          'X-API-Key': 'testToken'
        }
      })
        .get('/v1/hotel/MY_HOTEL/booking')
        .reply(200, { test: 'success' })
    })

    afterEach(() => {
      scope.done()
    })

    it('should use that default apiKey', async () => {
      const { getBookings } = withDefaults({ apiKey: 'testToken' })
      await getBookings({ hotelID: 'MY_HOTEL' })
      expect(scope.isDone()).to.equal(true)
    })
  })

  describe('when given a default hotelID', () => {
    let scope, result
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
          'X-API-Key': 'testToken'
        }
      })
        .get('/v1/hotel/MY_HOTEL/booking')
        .reply(200, { test: 'success' })
    })

    afterEach(() => {
      scope.done()
    })

    it('should use that default apiKey', async () => {
      const { getBookings } = withDefaults({
        apiKey: 'testToken',
        hotelID: 'MY_HOTEL'
      })
      await getBookings()
      expect(scope.isDone()).to.equal(true)
    })
  })
})
