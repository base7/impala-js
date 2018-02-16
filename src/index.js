import * as api from './api'
import withDefaults from './withDefaults'

const Impala = function(apiKey) {
  return {
    ...withDefaults({ apiKey }),
    getHotel: hotelId => {
      if (!hotelId) {
        throw new Error('getHotel requires a hotelId as its first argument')
      }
      return withDefaults({ apiKey, hotelId })
    }
  }
}

export default Impala
