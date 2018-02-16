import fetch from 'node-fetch'
import makeImpalaUrl from './url'
import pkg from '../package.json'

const userAgent = `${pkg.name}/${pkg.version}`

export const makeImpalaRequest = async (
  path,
  apiKey,
  queryParams,
  { baseUrl, headers = {}, ...fetchOptions } = {}
) => {
  if (!path) {
    throw new Error('You must supply a path!')
  }
  if (!apiKey) {
    throw new Error('No apiKey was supplied')
  }

  const url = makeImpalaUrl(path, queryParams, baseUrl)

  let request
  try {
    request = await fetch(url, {
      ...fetchOptions,
      headers: {
        'User-Agent': userAgent,
        Authorization: `Bearer ${apiKey}`,
        ...headers
      }
    })
  } catch (error) {
    throw new Error(
      `Could not make request to Impala API: ${error.message || error}`
    )
  }

  if (request.status === 204) {
    return null
  }

  let json
  try {
    json = await request.json()
  } catch (e) {
    throw new Error('Impala API returned an invalid response')
  }

  if (request.status === 400 || request.status === 404) {
    throw new Error(json.message)
  }

  if (!request.ok) {
    throw new Error(
      `Impala API return a HTTP ${request.status} error (${request.statusText})`
    )
  }
  return json
}

export default makeImpalaRequest
