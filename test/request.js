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
    let scope
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

  describe('given a request that returns an HTTP 204 (No Content) response', () => {
    let scope
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
          'X-API-Key': 'testToken'
        }
      })
        .get('/v1/path/to/endpoint')
        .reply(204)
    })

    afterEach(() => {
      scope.done()
    })

    it('should return null', async () => {
      const result = await makeImpalaRequest(['path', 'to', 'endpoint'], 'testToken')
      expect(result).to.equal(null)
      expect(scope.isDone()).to.equal(true)
    })
  })

  describe('given a request that returns an HTTP 400 (Bad Request) error', () => {
    let scope
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
          'X-API-Key': 'testToken'
        }
      })
        .get('/v1/path/to/endpoint')
        .reply(400, { message: 'You did something wrong!'})
    })

    afterEach(() => {
      scope.done()
    })

    it('should throw the error message as an Error', async () => {
      let threw
      try {
        await makeImpalaRequest(['path', 'to', 'endpoint'], 'testToken')
      } catch (e) {
        threw = true
        expect(e.message).to.equal('You did something wrong!')
      }
      expect(threw).to.equal(true)
      expect(scope.isDone()).to.equal(true)
    })
  })

  describe('given an overridden fetch method', () => {
    it('should fetch using the overridden method')
  })

  describe('given an overridden base URL', () => {
    it('should fetch using the overridden base URL')
  })

  describe('given an extra set of headers', () => {
    it('should fetch with the additional headers specified')
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
