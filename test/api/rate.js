import { expect } from 'chai';
import nock from 'nock';
import { getRates, getRateById } from '../../src/api/rate';

describe('getRates', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/rate')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/rate endpoint', async () => {
    await getRates({ apiKey: 'testToken', hotelId: 'HOTEL' });
    expect(scope.isDone()).to.equal(true);
  });
});

describe('getRateById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/rate/RATE')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/rate/:rateId endpoint', async () => {
    await getRateById({
      apiKey: 'testToken',
      hotelId: 'HOTEL',
      rateId: 'RATE',
    });
    expect(scope.isDone()).to.equal(true);
  });
});
