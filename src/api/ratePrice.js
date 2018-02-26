import makeImpalaRequest from '../request';

export const getRatePrices = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRatePrices requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRatePrices requires a hotelId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'rate-price'],
    apiKey,
    null,
    requestOptions
  );
};

export const getRatePriceById = async (
  ratePriceId,
  { apiKey, hotelId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRatePriceById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRatePriceById requires a hotelId');
  }

  if (!ratePriceId) {
    throw new Error('getRatePriceById requires a ratePriceId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'rate-price', ratePriceId],
    apiKey,
    null,
    requestOptions
  );
};
