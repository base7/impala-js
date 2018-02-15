import makeImpalaRequest from '../request'

export const getRooms = async ({ apiKey, hotelID }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRooms requires an apiKey')
  }

  if (!hotelID) {
    throw new Error('getRooms requires a hotelID')
  }

  const rooms = await makeImpalaRequest(
    ['hotel', hotelID, 'room'],
    apiKey,
    requestOptions
  )

  return []
}

export const getRoomByID = async (
  { apiKey, hotelID, roomID },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRoomByID requires an apiKey')
  }

  if (!hotelID) {
    throw new Error('getRoomByID requires a hotelID')
  }

  if (!roomID) {
    throw new Error('getRoomByID requires a roomID')
  }

  return await makeImpalaRequest(
    ['hotel', hotelID, 'room', roomID],
    apiKey,
    requestOptions
  )
}
