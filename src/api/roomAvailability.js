import formatDate from 'date-fns/format';
import makeImpalaRequest from '../request';

export const getRoomAvailabilities = async (
  { apiKey, hotelId, roomId, startDate, endDate },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRoomAvailabilities requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRoomAvailabilities requires a hotelId');
  }

  if (!!startDate !== !!endDate) {
    throw new Error(
      'getRoomAvailabilities requires both startDate and endDate (or neither)'
    );
  }

  let queryParams = {};

  if (startDate) {
    queryParams = {
      ...queryParams,
      startDate: formatDate(startDate, 'YYYY-MM-DD'),
      endDate: formatDate(endDate, 'YYYY-MM-DD'),
    };
  }

  queryParams = queryParams || null;

  const route = ['hotel', hotelId, 'room'];
  if (roomId) {
    route.push(roomId);
  }
  route.push('availability');

  return await makeImpalaRequest(route, apiKey, queryParams, requestOptions);
};
