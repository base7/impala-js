import { expect } from 'chai';
import nock from 'nock';
import { getRoomTypes, getRoomTypeById } from '../../src/api';

describe('getRoomTypes', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/room-type')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/room-type endpoint', async () => {
    await getRoomTypes({ apiKey: 'testToken', hotelId: 'HOTEL' });
    expect(scope.isDone()).to.equal(true);
  });
});

describe('getRoomTypeById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/room-type/ROOMTYPE')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/room-type/:roomTypeId endpoint', async () => {
    await getRoomTypeById('ROOMTYPE', {
      apiKey: 'testToken',
      hotelId: 'HOTEL',
    });
    expect(scope.isDone()).to.equal(true);
  });
});
