import { expect } from 'chai';
import nock from 'nock';
import { getRatePrices, getRatePriceById } from '../../src/api';

describe('getRatePrices', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/rate-price')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/rate-price endpoint', async () => {
    await getRatePrices({ apiKey: 'testToken', hotelId: 'HOTEL' });
    expect(scope.isDone()).to.equal(true);
  });
});

describe('getRatePriceById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/rate-price/RATEPRICE')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/rate-price/:ratePriceId endpoint', async () => {
    await getRatePriceById({
      apiKey: 'testToken',
      hotelId: 'HOTEL',
      ratePriceId: 'RATEPRICE',
    });
    expect(scope.isDone()).to.equal(true);
  });
});
