import { stringify } from 'querystring';
const BASE_URL = 'https://api.getimpala.com/v1/';

const makeImpalaUrl = (path = [], queryParams = {}, base = BASE_URL) => {
  const queryString =
    queryParams && Object.keys(queryParams).length
      ? '?' + stringify(queryParams)
      : '';
  return base + path.join('/') + queryString;
};

export default makeImpalaUrl;
