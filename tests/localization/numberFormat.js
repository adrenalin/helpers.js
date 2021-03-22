const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('lib/Localization numberFormat', () => {
  const l10n = new Localization()

  it('should have default values for getDecimalSeparator and getThousandsSeparator', (done) => {
    expect(l10n.getDecimalSeparator()).to.be('.')
    expect(l10n.getThousandSeparator()).to.be(',')
    done()
  })

  it('should give the localized decimal and thousand separators', (done) => {
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

    expect(l10n.getDecimalSeparator('fi')).to.be(',')
    expect(l10n.getDecimalSeparator('xx')).to.be('-')

    expect(l10n.getThousandSeparator('fi')).to.be(' ')
    expect(l10n.getThousandSeparator('xx')).to.be('T')

    done()
  })

  it('should round to the closest integer with zero precision', (done) => {
    expect(l10n.numberFormat(1)).to.be('1')
    done()
  })

  it('should round to the closest integer with given precision', (done) => {
    expect(l10n.numberFormat(1, 2)).to.be('1.00')
    done()
  })

  it('should throw an error if mixing a configuration object with other parameters', (done) => {
    try {
      l10n.numberFormat(10, { precision: 10 }, 'fi')
      done(new Error('Did not catch an error with mixed parameters'))
    } catch (err) {
      done()
    }
  })

  it('should use the given decimal separator', (done) => {
    l10n.registerLocales({
      decimalSeparator: {
        en: '.',
        fi: ','
      }
    })

    expect(l10n.numberFormat(1, 2, 'fi', ',')).to.be('1,00')
    expect(l10n.numberFormat(1, { lang: 'fi', precision: 2 })).to.be('1,00')
    expect(l10n.numberFormat(1, { lang: 'en', precision: 2 })).to.be('1.00')
    expect(l10n.numberFormat(1, { lang: 'en', precision: 2, decimal: 'x' })).to.be('1x00')
    done()
  })

  it('should use the given thousand separator', (done) => {
    l10n.registerLocales({
      thousandSeparator: {
        en: ',',
        fi: ' '
      }
    })

    expect(l10n.numberFormat(1000000, 0, 'fi', ',', ' ')).to.be('1 000 000')
    expect(l10n.numberFormat(1000000, { lang: 'fi' })).to.be('1 000 000')
    expect(l10n.numberFormat(1000000, { lang: 'en' })).to.be('1,000,000')
    expect(l10n.numberFormat(1000000, { lang: 'en', thousand: 't' })).to.be('1t000t000')
    done()
  })

  it('should return grouped decimals', (done) => {
    expect(l10n.numberFormat(0.00000001, 8, 'fi', ',', ' ')).to.be('0,000 000 01')
    done()
  })

  it('should return grouped decimals even without the given precision', (done) => {
    expect(l10n.numberFormat(0.00000001, null, 'fi', ',', ' ')).to.be('0,000 000 01')
    expect(l10n.numberFormat(0.0001, null, 'fi', ',', ' ')).to.be('0,000 1')
    done()
  })

  it('should return grouped decimals with large precision', (done) => {
    expect(l10n.numberFormat(0.1, 8, 'fi', ',', ' ')).to.be('0,100 000 00')
    done()
  })

  it('should return null when given null or undefined', (done) => {
    expect(l10n.numberFormat(null)).to.be(null)
    expect(l10n.numberFormat(undefined)).to.be(null)

    try {
      expect(l10n.numberFormat('foo')).to.throwError()
      done(new Error('Should have thrown an error'))
    } catch (err) {
    }
    done()
  })
})
