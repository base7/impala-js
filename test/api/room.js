import { expect } from 'chai';
import nock from 'nock';
import { getRooms, getRoomById } from '../../src/api/room';

describe('getRooms', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/room')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/room endpoint', async () => {
    await getRooms({ apiKey: 'testToken', hotelId: 'HOTEL' });
    expect(scope.isDone()).to.equal(true);
  });
});

describe('getRoomById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/room/ROOM')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/room/:roomId endpoint', async () => {
    await getRoomById({
      apiKey: 'testToken',
      hotelId: 'HOTEL',
      roomId: 'ROOM',
    });
    expect(scope.isDone()).to.equal(true);
  });
});
