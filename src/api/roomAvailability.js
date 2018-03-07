import makeImpalaRequest from '../request';

export const getRoomAvailabilities = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRoomAvailabilities requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRoomAvailabilities requires a hotelId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'room-availability'],
    apiKey,
    null,
    requestOptions
  );
};

export const getRoomAvailabilityById = async (
  roomAvailabilityId,
  { apiKey, hotelId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRoomAvailabilityById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRoomAvailabilityById requires a hotelId');
  }

  if (!roomAvailabilityId) {
    throw new Error('getRoomAvailabilityById requires a roomAvailabilityId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'room-availability', roomAvailabilityId],
    apiKey,
    null,
    requestOptions
  );
};
