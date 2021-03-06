import { expect } from 'chai';
import nock from 'nock';
import { getBookings, getBookingById, updateBookingById } from '../../src/api';

describe('getBookings', () => {
  let scope;

  afterEach(() => {
    if (scope) {
      scope.done();
    }
    scope = null;
  });

  describe('given neither a startDate nor endDate', () => {
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
        },
      })
        .get('/v1/hotel/HOTEL/booking')
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/booking endpoint', async () => {
      await getBookings({ apiKey: 'testToken', hotelId: 'HOTEL' });
      expect(scope.isDone()).to.equal(true);
    });
  });

  describe('given both a startDate and endDate (as native Dates)', () => {
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
        },
      })
        .get('/v1/hotel/HOTEL/booking?startDate=2017-02-03&endDate=2017-03-04')
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/booking endpoint', async () => {
      await getBookings({
        apiKey: 'testToken',
        hotelId: 'HOTEL',
        startDate: new Date(2017, 1, 3),
        endDate: new Date(2017, 2, 4),
      });
      expect(scope.isDone()).to.equal(true);
    });
  });

  describe('given both a startDate and endDate (as ISO8601 strings)', () => {
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
        },
      })
        .get('/v1/hotel/HOTEL/booking?startDate=2017-02-03&endDate=2017-03-04')
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/booking endpoint', async () => {
      await getBookings({
        apiKey: 'testToken',
        hotelId: 'HOTEL',
        startDate: '2017-02-03',
        endDate: '2017-03-04',
      });
      expect(scope.isDone()).to.equal(true);
    });
  });

  describe('given just a startDate', () => {
    it('should throw an error', async () => {
      let threw;
      try {
        await getBookings({
          apiKey: 'testToken',
          hotelId: 'HOTEL',
          startDate: new Date(),
        });
      } catch (error) {
        threw = true;
      }
      expect(threw).to.equal(true);
    });
  });

  describe('given just a endDate', () => {
    it('should throw an error', async () => {
      let threw;
      try {
        await getBookings({
          apiKey: 'testToken',
          hotelId: 'HOTEL',
          endDate: new Date(),
        });
      } catch (error) {
        threw = true;
      }
      expect(threw).to.equal(true);
    });
  });
});

describe('getBookingById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
      },
    })
      .get('/v1/hotel/HOTEL/booking/BOOKING')
      .reply(200, { test: 'success' });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the GET /hotel/:hotelId/booking/:bookingId endpoint', async () => {
    await getBookingById('BOOKING', {
      apiKey: 'testToken',
      hotelId: 'HOTEL',
    });
    expect(scope.isDone()).to.equal(true);
  });
});

describe('updateBookingById', () => {
  let scope;
  beforeEach(async () => {
    scope = nock('https://api.getimpala.com', {
      reqheaders: {
        Authorization: 'Bearer testToken',
        'Content-Type': 'application/json',
      },
    })
      .patch('/v1/hotel/HOTEL/booking/BOOKING')
      .reply(function(uri, requestBody) {
        return [200, requestBody, this.req.headers];
      });
  });

  afterEach(() => {
    scope.done();
  });

  it('should call the PATCH /hotel/:hotelId/booking/:bookingId endpoint', async () => {
    const body = { test: 'success' };
    const result = await updateBookingById('BOOKING', body, {
      apiKey: 'testToken',
      hotelId: 'HOTEL',
    });
    expect(scope.isDone()).to.equal(true);
    expect(result).to.deep.equal(body);
  });

  it('should retain headers provided', async () => {
    scope.matchHeader('Test', 'foo');
    const result = await updateBookingById(
      'BOOKING',
      {},
      {
        apiKey: 'testToken',
        hotelId: 'HOTEL',
      },
      { headers: { Test: 'foo' } }
    );
    expect(scope.isDone()).to.equal(true);
  });

  it("shouldn't allow method to be overridden", async () => {
    const result = await updateBookingById(
      'BOOKING',
      {},
      {
        apiKey: 'testToken',
        hotelId: 'HOTEL',
      },
      { headers: { Test: 'foo' }, method: 'PUT' }
    );
    expect(scope.isDone()).to.equal(true);
  });
});
