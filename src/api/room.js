import makeImpalaRequest from '../request';

export const getRooms = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRooms requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRooms requires a hotelId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'room'],
    apiKey,
    null,
    requestOptions
  );
};

export const getRoomById = async (
  { apiKey, hotelId, roomId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRoomById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRoomById requires a hotelId');
  }

  if (!roomId) {
    throw new Error('getRoomById requires a roomId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'room', roomId],
    apiKey,
    null,
    requestOptions
  );
};
