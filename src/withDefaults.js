import * as api from './api'

const withDefaults = (paramOverrides = {}, requestOptionOverrides = {}) =>
  Object.entries(api).reduce((hotel, [name, method]) => {
    hotel[name] = (params, requestOptions) =>
      method(
        { ...params, ...paramOverrides },
        { ...requestOptions, ...requestOptionOverrides }
      )
    return hotel
  }, {})

export default withDefaults
