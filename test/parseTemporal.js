const Moment = require('moment')
const { expect } = require('chai')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const parseTemporal = require('../lib/parseTemporal')

describe('lib/parseTemporal', () => {
  it('should accept a temporal string as the first argument', () => {
    // Not a temporal string
    expect(() => parseTemporal('foo')).to.throw(InvalidArgument)

    // Garbled end
    expect(() => parseTemporal('P1DF')).to.throw(InvalidArgument)

    // No time designator, but has seconds
    expect(() => parseTemporal('P1S')).to.throw(InvalidArgument)

    // Valid temporal
    expect(() => parseTemporal('P1DT1H')).not.to.throw()

    // Valid temporal with only days
    expect(() => parseTemporal('P1D')).not.to.throw()

    // Valid temporal with only time
    expect(() => parseTemporal('PT1H')).not.to.throw()
  })

  it('should add the temporal periods', () => {
    const m = new Moment()

    expect(parseTemporal('P10Y').diff(m, 'years')).to.eql(10, '10 years')

    expect(parseTemporal('P1D').diff(m, 'days')).to.eql(1, '1 day')
    expect(parseTemporal('P10D').diff(m, 'days')).to.eql(10, '10 days')

    expect(parseTemporal('P1M').diff(m, 'months')).to.eql(1, '1 month')

    expect(parseTemporal('PT1M').diff(m, 'minutes')).to.eql(1, '1 minute')

    expect(parseTemporal('PT2.0S').diff(m, 'seconds')).to.eql(2, '2 seconds')
  })
})
