import makeImpalaRequest from '../request';

export const getRatePlans = async ({ apiKey, hotelId }, requestOptions) => {
  if (!apiKey) {
    throw new Error('getRatePlans requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRatePlans requires a hotelId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'rate-plan'],
    apiKey,
    null,
    requestOptions
  );
};

export const getRatePlanById = async (
  { apiKey, hotelId, ratePlanId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getRatePlanById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getRatePlanById requires a hotelId');
  }

  if (!ratePlanId) {
    throw new Error('getRatePlanById requires a ratePlanId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'rate-plan', ratePlanId],
    apiKey,
    null,
    requestOptions
  );
};
