import makeImpalaRequest from '../request'

export const getBookings = async ({ apiKey, hotelID }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getBookings requires an apiKey')
  }
  if (!hotelID) {
    throw new Error('getBookings requires a hotelID')
  }
  return makeImpalaRequest(
    ['hotel', hotelID, 'booking'],
    apiKey,
    requestOptions
  )
}

export const getBookingByID = async (
  { apiKey, hotelID, bookingID },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getBookingByID requires an apiKey')
  }
  if (!hotelID) {
    throw new Error('getBookingByID requires a hotelID')
  }
  if (!bookingID) {
    throw new Error('getBookingByID requires a bookingID')
  }
  return makeImpalaRequest(
    ['hotel', hotelID, 'booking', bookingID],
    apiKey,
    requestOptions
  )
}
