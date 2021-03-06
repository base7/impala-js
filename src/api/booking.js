import formatDate from 'date-fns/format';
import makeImpalaRequest from '../request';

export const getBookings = async (
  { apiKey, hotelId, startDate, endDate },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getBookings requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getBookings requires a hotelId');
  }

  if (!!startDate !== !!endDate) {
    throw new Error(
      'getBookings requires both startDate and endDate (or neither)'
    );
  }

  const queryParams = startDate
    ? {
        startDate: formatDate(startDate, 'YYYY-MM-DD'),
        endDate: formatDate(endDate, 'YYYY-MM-DD'),
      }
    : null;

  const bookings = await makeImpalaRequest(
    ['hotel', hotelId, 'booking'],
    apiKey,
    queryParams,
    requestOptions
  );

  return bookings || null;
};

export const getBookingById = async (
  bookingId,
  { apiKey, hotelId },
  requestOptions
) => {
  if (!apiKey) {
    throw new Error('getBookingById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('getBookingById requires a hotelId');
  }

  if (!bookingId) {
    throw new Error('getBookingById requires a bookingId');
  }

  return await makeImpalaRequest(
    ['hotel', hotelId, 'booking', bookingId],
    apiKey,
    null,
    requestOptions
  );
};

export const updateBookingById = async (
  bookingId,
  body,
  { apiKey, hotelId },
  requestOptions = {}
) => {
  if (!apiKey) {
    throw new Error('updateBookingById requires an apiKey');
  }

  if (!hotelId) {
    throw new Error('updateBookingById requires a hotelId');
  }

  if (!bookingId) {
    throw new Error('updateBookingById requires a bookingId');
  }

  requestOptions = {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    method: 'PATCH',
  };

  return await makeImpalaRequest(
    ['hotel', hotelId, 'booking', bookingId],
    apiKey,
    null,
    requestOptions
  );
};
