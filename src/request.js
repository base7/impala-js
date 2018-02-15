import defaultFetch from 'node-fetch'
import makeImpalaUrl from './url'
import pkg from '../package.json'

const userAgent = `${pkg.name}/${pkg.version}`

export const makeImpalaRequest = async (
  path,
  authToken,
  { fetch = defaultFetch, baseUrl, headers = {} } = {}
) => {
  if (!path) {
    throw new Error('You must supply a path!')
  }
  if (!authToken) {
    throw new Error('No authToken was supplied')
  }

  const url = makeImpalaUrl(path, baseUrl)

  const request = await fetch(url, {
    headers: {
      'User-Agent': userAgent,
      ...makeAuthorizationHeaders(authToken),
      ...headers
    }
  })
}

export const makeAuthorizationHeaders = token => ({
  'X-API-Key': token,
  Authorization: `Bearer ${token}`
})

export default makeImpalaRequest
