import * as api from './api';
import withDefaults from './withDefaults';

const Impala = function(options) {
  if (!options || !options.apiKey) {
    throw new Error('apiKey is required when instantiating');
  }

  const { apiKey, hotelId } = options;

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
