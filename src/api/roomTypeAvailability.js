import formatDate from 'date-fns/format';
import makeImpalaRequest from '../request';

export const getRoomTypeAvailabilities = async (
  { apiKey, hotelId, roomTypeId, startDate, endDate },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRoomTypeAvailabilities requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRoomTypeAvailabilities requires a hotelId');
  }

  if (!!startDate !== !!endDate) {
    throw new Error(
      'getRoomTypeAvailabilities requires both startDate and endDate (or neither)'
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

  const route = ['hotel', hotelId, 'room-type'];
  if (roomTypeId) {
    route.push(roomTypeId);
  }
  route.push('availability');

  return await makeImpalaRequest(route, apiKey, queryParams, requestOptions);
};
