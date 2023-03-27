const { expect } = require('chai')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const { Localization } = require('../../')

describe('lib/Localization numberFormat', () => {
  const l10n = new Localization()

  it('should have default values for getDecimalSeparator and getThousandsSeparator', () => {
    expect(l10n.getDecimalSeparator()).to.equal('.')
    expect(l10n.getThousandSeparator()).to.equal(',')
  })

  it('should give the localized decimal and thousand separators', () => {
    l10n.registerLocales({
      decimalSeparator: {
        xx: '-',
        fi: ','
      },
      thousandSeparator: {
        xx: 'T',
        fi: ' '
      }
    })

    expect(l10n.getDecimalSeparator('fi')).to.equal(',')
    expect(l10n.getDecimalSeparator('xx')).to.equal('-')

    expect(l10n.getThousandSeparator('fi')).to.equal(' ')
    expect(l10n.getThousandSeparator('xx')).to.equal('T')
  })

  it('should round to the closest integer with zero precision', () => {
    expect(l10n.numberFormat(1)).to.equal('1')
  })

  it('should round to the closest integer with given precision', () => {
    expect(l10n.numberFormat(1, 2)).to.equal('1.00')
  })

  it('should throw an error if mixing a configuration object with other parameters', () => {
    expect(() => l10n.numberFormat(10, { precision: 10 }, 'fi')).to.throw(InvalidArgument)
  })

  it('should use the given decimal separator', () => {
    l10n.registerLocales({
      decimalSeparator: {
        en: '.',
        fi: ','
      }
    })

    expect(l10n.numberFormat(1, 2, 'fi', ',')).to.equal('1,00')
    expect(l10n.numberFormat(1, { lang: 'fi', precision: 2 })).to.equal('1,00')
    expect(l10n.numberFormat(1, { lang: 'en', precision: 2 })).to.equal('1.00')
    expect(l10n.numberFormat(1, { lang: 'en', precision: 2, decimal: 'x' })).to.equal('1x00')
  })

  it('should use the given thousand separator', () => {
    l10n.registerLocales({
      thousandSeparator: {
        en: ',',
        fi: ' '
      }
    })

    expect(l10n.numberFormat(1000000, 0, 'fi', ',', ' ')).to.equal('1 000 000')
    expect(l10n.numberFormat(1000000, { lang: 'fi' })).to.equal('1 000 000')
    expect(l10n.numberFormat(1000000, { lang: 'en' })).to.equal('1,000,000')
    expect(l10n.numberFormat(1000000, { lang: 'en', thousand: 't' })).to.equal('1t000t000')
  })

  it('should return grouped decimals', () => {
    expect(l10n.numberFormat(0.00000001, 8, 'fi', ',', ' ')).to.equal('0,000 000 01')
  })

  it('should return grouped decimals even without the given precision', () => {
    expect(l10n.numberFormat(0.00000001, null, 'fi', ',', ' ')).to.equal('0,000 000 01')
    expect(l10n.numberFormat(0.0001, null, 'fi', ',', ' ')).to.equal('0,000 1')
  })

  it('should return grouped decimals with large precision', () => {
    expect(l10n.numberFormat(0.1, 8, 'fi', ',', ' ')).to.equal('0,100 000 00')
  })

  it('should accept "round", "ceil", and "floor" as rounding methods', () => {
    expect(l10n.numberFormat(1.2, { rounding: 'round' })).to.eql('1', 'round 1.2')
    expect(l10n.numberFormat(1.7, { rounding: 'round' })).to.eql('2', 'round 2')

    expect(l10n.numberFormat(1.2, { rounding: 'ceil' })).to.eql('2', 'ceil 1.2')
    expect(l10n.numberFormat(1.7, { rounding: 'floor' })).to.eql('1', 'floor 1.7')

    expect(l10n.numberFormat(12, { precision: -1, rounding: 'round' })).to.eql('10', 'round 12, precision -1')
    expect(l10n.numberFormat(17, { precision: -1, rounding: 'round' })).to.eql('20', 'round 17, precision -1')

    expect(() => l10n.numberFormat(1, { rounding: 'pow' })).to.throw(Localization.errors.INVALID_ARGUMENT)
  })

  it('should return null when given null or undefined', () => {
    expect(l10n.numberFormat(null)).to.equal(null)
    expect(l10n.numberFormat(undefined)).to.equal(null)
    expect(() => l10n.numberFormat('foo')).to.throw(InvalidArgument)
  })

  it('should output the given number of digits', () => {
    expect(() => l10n.numberFormat(1.23456, { digits: 'foo' })).to.throw(Localization.errors.INVALID_ARGUMENT)
    expect(l10n.numberFormat(1.23456, { digits: 2 })).to.eql('1.2', 'plain decimal')
    expect(l10n.numberFormat(0.123, { digits: 2, decimal: '.' })).to.eql('0.12', 'less than 1')
    expect(l10n.numberFormat(1234567, { digits: 2, thousand: ',' })).to.eql('1,200,000', 'above 1')
    expect(l10n.numberFormat(1999999, { digits: 2, thousand: ',' })).to.eql('2,000,000', 'rounding: round')
    expect(l10n.numberFormat(1999999, { digits: 2, thousand: ',', rounding: 'floor' })).to.eql('1,900,000', 'rounding: floor')
    expect(l10n.numberFormat(1234567, { digits: 2, thousand: ',', rounding: 'ceil' })).to.eql('1,300,000', 'rounding: ceil')
  })
})
