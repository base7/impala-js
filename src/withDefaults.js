import * as api from './api'

const withDefaults = (paramOverrides = {}, requestOptionOverrides = {}) => {
  if (!paramOverrides || !paramOverrides.apiKey) {
    throw new Error('You must pass an apiKey parameter')
  }
  return Object.entries(api).reduce((hotel, [name, method]) => {
    hotel[name] = (params, requestOptions) =>
      method(
        { ...params, ...paramOverrides },
        { ...requestOptions, ...requestOptionOverrides }
      )
    return hotel
  }, {})
}

export default withDefaults
