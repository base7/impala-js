import { expect } from 'chai';
import nock from 'nock';
import { getGuests, getGuestById } from '../../src/api';

describe('getGuests', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/guest')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/guest endpoint', async () => {
    await getGuests({ apiKey: 'testToken', hotelId: 'HOTEL' });
    expect(scope.isDone()).to.equal(true);
  });
});

describe('getGuestById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/guest/GUEST')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/guest/:guestId endpoint', async () => {
    await getGuestById('GUEST', {
      apiKey: 'testToken',
      hotelId: 'HOTEL',
    });
    expect(scope.isDone()).to.equal(true);
  });
});
