import defaultFetch from 'node-fetch'
import makeImpalaUrl from './url'
import pkg from '../package.json'

const userAgent = `${pkg.name}/${pkg.version}`

export const makeImpalaRequest = async (
  path,
  apiKey,
  { fetch = defaultFetch, baseUrl, headers = {}, ...fetchOptions } = {}
) => {
  if (!path) {
    throw new Error('You must supply a path!')
  }
  if (!apiKey) {
    throw new Error('No apiKey was supplied')
  }

  const url = makeImpalaUrl(path, baseUrl)

  const request = await fetch(url, {
    ...fetchOptions,
    headers: {
      'User-Agent': userAgent,
      ...makeAuthorizationHeaders(apiKey),
      ...headers
    },
  })

  let json
  try {
    json = await request.json()
  } catch (e) {
    throw new Error('Impala API returned an invalid response')
  }

  if (request.status === 400) {
    throw new Error(json.message)
  }

  if (!request.ok) {
    throw new Error(
      `Impala API return a HTTP ${request.status} error (${request.statusText})`
    )
  }
  return json
}

export const makeAuthorizationHeaders = token => ({
  'X-API-Key': token,
  Authorization: `Bearer ${token}`
})

export default makeImpalaRequest
