import formatDate from 'date-fns/format';
import makeImpalaRequest from '../request';

export const getRatePrices = async (
  { apiKey, hotelId, rateId, roomTypeId, startDate, endDate },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRatePrices requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRatePrices requires a hotelId');
  }

  if (!!startDate !== !!endDate) {
    throw new Error(
      'getRatePrices requires both startDate and endDate (or neither)'
    );
  }

  let queryParams = {};

  if (roomTypeId) {
    queryParams = { ...queryParams, roomTypeId };
  }

  if (startDate) {
    queryParams = {
      ...queryParams,
      startDate: formatDate(startDate, 'YYYY-MM-DD'),
      endDate: formatDate(endDate, 'YYYY-MM-DD'),
    };
  }

  queryParams = queryParams || null;

  const route = ['hotel', hotelId, 'rate'];
  if (rateId) {
    route.push(rateId);
  }
  route.push('price');

  return await makeImpalaRequest(route, apiKey, queryParams, requestOptions);
};
