import { expect } from 'chai'
import makeImpalaUrl from '../src/url'

describe('makeImpalaUrl', () => {
  describe('given no parameters', () => {
    it('should return the base URL', () => {
      const actual = makeImpalaUrl()
      const expected = 'https://api.getimpala.com/v1/'
      expect(actual).to.equal(expected)
    })
  })

  describe('given a path', () => {
    it('should return the base URL with the path concatenated', () => {
      const actual = makeImpalaUrl(['path', 'to', 'endpoint'])
      const expected = 'https://api.getimpala.com/v1/path/to/endpoint'
      expect(actual).to.equal(expected)
    })
  })

  describe('given a set of query parameters', () => {
    it('should return the base URL with the path and query string concatenated', () => {
      const actual = makeImpalaUrl(['path'], { foo: 'bar', baz: 'quux' })
      const expected = 'https://api.getimpala.com/v1/path?foo=bar&baz=quux'
      expect(actual).to.equal(expected)
    })
  })

  describe('given an overridden base URL', () => {
    it('should use the overridden base URL instead', () => {
      const actual = makeImpalaUrl(
        ['path', 'to', 'endpoint'],
        null,
        'http://0.0.0.0/'
      )
      const expected = 'http://0.0.0.0/path/to/endpoint'
      expect(actual).to.equal(expected)
    })
  })
})
