import makeImpalaRequest from '../request';

export const getRoomTypes = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRoomTypes requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRoomTypes requires a hotelId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'room-type'],
    apiKey,
    null,
    requestOptions
  );
};

export const getRoomTypeById = async (
  roomTypeId,
  { apiKey, hotelId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRoomTypeById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRoomTypeById requires a hotelId');
  }

  if (!roomTypeId) {
    throw new Error('getRoomTypeById requires a roomTypeId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'room-type', roomTypeId],
    apiKey,
    null,
    requestOptions
  );
};
