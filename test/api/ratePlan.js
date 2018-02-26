import { expect } from 'chai';
import nock from 'nock';
import { getRatePlans, getRatePlanById } from '../../src/api';

describe('getRatePlans', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/rate-plan')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/rate-plan endpoint', async () => {
    await getRatePlans({ apiKey: 'testToken', hotelId: 'HOTEL' });
    expect(scope.isDone()).to.equal(true);
  });
});

describe('getRatePlanById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/rate-plan/RATEPLAN')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/rate-plan/:ratePlanId endpoint', async () => {
    await getRatePlanById('RATEPLAN', {
      apiKey: 'testToken',
      hotelId: 'HOTEL',
    });
    expect(scope.isDone()).to.equal(true);
  });
});
