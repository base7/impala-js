import { expect } from 'chai';
import nock from 'nock';
import { getRatePrices, getRatePriceById } from '../../src/api';

describe('getRatePrices', () => {
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
        .get('/v1/hotel/HOTEL/rate/price')
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/rate/price endpoint', async () => {
      await getRatePrices({ apiKey: 'testToken', hotelId: 'HOTEL' });
      expect(scope.isDone()).to.equal(true);
    });
  });

  describe('given an rateId', () => {
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
        },
      })
        .get('/v1/hotel/HOTEL/rate/456/price')
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/rate/456/price endpoint', async () => {
      await getRatePrices({
        apiKey: 'testToken',
        hotelId: 'HOTEL',
        rateId: 456,
      });
      expect(scope.isDone()).to.equal(true);
    });
  });

  describe('given an roomTypeId', () => {
    beforeEach(async () => {
      scope = nock('https://api.getimpala.com', {
        reqheaders: {
          Authorization: 'Bearer testToken',
        },
      })
        .get('/v1/hotel/HOTEL/rate/price?roomTypeId=123')
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/rate/price?roomTypeId=123 endpoint', async () => {
      await getRatePrices({
        apiKey: 'testToken',
        hotelId: 'HOTEL',
        roomTypeId: 123,
      });
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
        .get(
          '/v1/hotel/HOTEL/rate/price?startDate=2017-02-03&endDate=2017-03-04'
        )
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/rate/price endpoint', async () => {
      await getRatePrices({
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
        .get(
          '/v1/hotel/HOTEL/rate/price?startDate=2017-02-03&endDate=2017-03-04'
        )
        .reply(200, { test: 'success' });
    });

    it('should call the GET /hotel/:hotelId/rate/price endpoint', async () => {
      await getRatePrices({
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
        await getRatePrices({
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
        await getRatePrices({
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
