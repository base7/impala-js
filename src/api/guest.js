import makeImpalaRequest from '../request'

export const getGuests = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getGuests requires an apiKey')
  }

  if (!hotelId) {
    throw new Error('getGuests requires a hotelId')
  }

  const guests = await makeImpalaRequest(
    ['hotel', hotelId, 'guest'],
    apiKey,
    requestOptions
  )

  return guests || []
}

export const getGuestById = async (
  { apiKey, hotelId, guestId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getGuestById requires an apiKey')
  }

  if (!hotelId) {
    throw new Error('getGuestById requires a hotelId')
  }

  if (!guestId) {
    throw new Error('getGuestById requires a guestId')
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'guest', guestId],
    apiKey,
    requestOptions
  )
}
