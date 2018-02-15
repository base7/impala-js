import { expect } from 'chai'
import nock from 'nock'
import { makeImpalaRequest, makeAuthorizationHeaders } from '../src/request'

describe('makeImpalaRequest (async)', () => {
  describe('given no parameters', () => {
    it('should throw an error', async () => {
      let threw
      try {
        await makeImpalaRequest()
        threw = false
      } catch (error) {
        threw = true
      }
      expect(threw).to.equal(true)
    })
  })

  describe('given a path but no auth token', () => {
    it('should throw an error', async () => {
      let threw
      try {
        await makeImpalaRequest(['path', 'to', 'endpoint'])
        threw = false
      } catch (error) {
        threw = true
      }
      expect(threw).to.equal(true)
    })
  })

  describe('given a valid path and auth token', () => {
    let scope, result
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
          'X-API-Key': 'testToken'
        }
      })
        .get('/v1/path/to/endpoint')
        .reply(200, { test: 'success' })
    })

    afterEach(() => {
      scope.done()
    })

    it('should make a request to the correct URL, with the correct headers', async () => {
      await makeImpalaRequest(['path', 'to', 'endpoint'], 'testToken')
      expect(scope.isDone()).to.equal(true)
    })
  })
})

describe('makeAuthorizationHeaders', () => {
  describe('given an auth token', () => {
    let result
    beforeEach(() => {
      result = makeAuthorizationHeaders('testToken')
    })
    it('should provide an Authorization header', () => {
      expect(result.Authorization).to.equal('Bearer testToken')
    })
    it('should provide an X-API-Key header', () => {
      expect(result['X-API-Key']).to.equal('testToken')
    })
  })
})
