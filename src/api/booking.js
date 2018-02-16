import makeImpalaRequest from '../request'

export const getBookings = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getBookings requires an apiKey')
  }

  if (!hotelId) {
    throw new Error('getBookings requires a hotelId')
  }

  const bookings = await makeImpalaRequest(
    ['hotel', hotelId, 'booking'],
    apiKey,
    null,
    requestOptions
  )

  return bookings || null
}

export const getBookingById = async (
  { apiKey, hotelId, bookingId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getBookingById requires an apiKey')
  }

  if (!hotelId) {
    throw new Error('getBookingById requires a hotelId')
  }

  if (!bookingId) {
    throw new Error('getBookingById requires a bookingId')
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'booking', bookingId],
    apiKey,
    null,
    requestOptions
  )
}
