import { expect } from 'chai'
import nock from 'nock'
import { makeImpalaRequest } from '../src/request'

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
          Authorization: 'Bearer testToken'
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
          Authorization: 'Bearer testToken'
        }
      })
        .get('/v1/path/to/endpoint')
        .reply(204)
    })

    afterEach(() => {
      scope.done()
    })

    it('should return null', async () => {
      const result = await makeImpalaRequest(
        ['path', 'to', 'endpoint'],
        'testToken'
      )
      expect(result).to.equal(null)
      expect(scope.isDone()).to.equal(true)
    })
  })

  describe('given a request that returns an HTTP 400 (Bad Request) error', () => {
    let scope
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken'
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

  describe('given a request that returns an HTTP 404 (Not Found) error', () => {
    let scope
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken'
        }
      })
        .get('/v1/path/to/endpoint')
        .reply(404, { message: 'Not yet implemented, sorry!'})
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
        expect(e.message).to.equal('Not yet implemented, sorry!')
      }
      expect(threw).to.equal(true)
      expect(scope.isDone()).to.equal(true)
    })
  })
})
