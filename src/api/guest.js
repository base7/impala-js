import makeImpalaRequest from '../request'

export const getGuests = async ({ apiKey, hotelID }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getGuests requires an apiKey')
  }

  if (!hotelID) {
    throw new Error('getGuests requires a hotelID')
  }

  const guests = await makeImpalaRequest(
    ['hotel', hotelID, 'guest'],
    apiKey,
    requestOptions
  )

  return guests || []
}

export const getGuestByID = async (
  { apiKey, hotelID, guestID },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getGuestByID requires an apiKey')
  }

  if (!hotelID) {
    throw new Error('getGuestByID requires a hotelID')
  }

  if (!guestID) {
    throw new Error('getGuestByID requires a guestID')
  }

  return await makeImpalaRequest(
    ['hotel', hotelID, 'guest', guestID],
    apiKey,
    requestOptions
  )
}
