import { expect } from 'chai'
import Impala from '../src/index'
import * as api from '../src/api'

describe('Impala', () => {
  it('should be a function', () => {
    expect(Impala).to.be.a('function')
  })

  describe('when called without parameters', () => {
    it('should throw an error', () => {
      expect(() => new Impala()).to.throw('apiKey')
    })
  })

  describe('when called with an apiKey', () => {
    let instance
    beforeEach(() => {
      instance = new Impala('API_KEY')
    })
    afterEach(() => {
      instance = null
    })
    it('should return a clone of the API', () => {
      expect(instance).to.be.an('object')
      Object.keys(api).forEach(methodName => {
        expect(instance).to.have.property(methodName)
        expect(instance[methodName]).to.be.a('function')
      })
    })
    it('...which should have a getHotel method', () => {
      expect(instance).to.have.property('getHotel')
    })

    describe('...which when called', () => {
      let hotelInstance
      beforeEach(() => {
        hotelInstance = instance.getHotel('HOTEL_ID')
      })
      afterEach(() => {
        hotelInstance = null
      })

      it('should return a clone of the API', () => {
        expect(hotelInstance).to.be.an('object')
        Object.keys(api).forEach(methodName => {
          expect(instance).to.have.property(methodName)
          expect(instance[methodName]).to.be.a('function')
        })
      })
    })
  })
})
