import makeImpalaRequest from '../request'

export const getRooms = async ({ apiKey, hotelID }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRooms requires an apiKey')
  }
  if (!hotelID) {
    throw new Error('getRooms requires a hotelID')
  }
  return makeImpalaRequest(
    ['hotel', hotelID, 'room'],
    apiKey,
    requestOptions
  )
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
  return makeImpalaRequest(
    ['hotel', hotelID, 'room', roomID],
    apiKey,
    requestOptions
  )
}
