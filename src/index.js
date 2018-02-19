import * as api from './api';
import withDefaults from './withDefaults';

const Impala = function({ apiKey, hotelId }) {
  const impala = {
    ...withDefaults({ apiKey, hotelId }),
  };

  if (!hotelId) {
    impala.getHotel = hotelId => {
      if (!hotelId) {
        throw new Error('getHotel requires a hotelId as its first argument');
      }
      return withDefaults({ apiKey, hotelId });
    };
  }

  return impala;
};

export default Impala;
