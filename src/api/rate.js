import makeImpalaRequest from '../request';

export const getRates = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRates requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRates requires a hotelId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'rate'],
    apiKey,
    null,
    requestOptions
  );
};

export const getRateById = async (
  { apiKey, hotelId, rateId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRateById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRateById requires a hotelId');
  }

  if (!rateId) {
    throw new Error('getRateById requires a rateId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'rate', rateId],
    apiKey,
    null,
    requestOptions
  );
};
