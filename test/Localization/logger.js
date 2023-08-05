const { expect } = require('chai')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const { Localization } = require('../../')

describe('lib/Localization logger', () => {
  it('should have a static method to register a logger that accepts a function', () => {
    const callback = () => {

    }

    expect(Localization.registerLogger).to.be.a('function')
    expect(() => Localization.registerLogger(null)).to.throw(InvalidArgument)
    expect(() => Localization.registerLogger(callback).not.to.throw())
  })

  it('should have an instance method to register a logger', () => {
    const l10n = new Localization()
    expect(l10n.registerLogger).to.be.a('function')
    expect(l10n.registerLogger(() => {})).to.equal(l10n)
  })

  it('should use the logger', () => {
    const loggerTest = 'loggerTest'
    let match = 0

    const callback = (level, input) => {
      if (level === 'warn' && input === loggerTest) {
        match++
      }
    }

    const l10n = new Localization()
    l10n.registerLogger(callback)
    const rval = l10n.logger('warn', loggerTest)
    l10n.logger('error', loggerTest)

    expect(match).to.equal(1)
    expect(rval).to.equal(l10n)
  })

  it('should pass to logger a warning about missing locale, but only once', () => {
    const missingLocale = 'missingLocaleWarning'
    let match = 0

    const callback = (level, input) => {
      if (level === 'warn' && input.key === missingLocale) {
        match++
      }
    }

    const l10n = new Localization()
    l10n.registerLogger(callback)
    l10n.get(missingLocale)
    l10n.get(missingLocale)

    expect(match).to.equal(1)
  })

  it('should not pass to logger anything marked as a variable', () => {
    const missingLocale = 'missingLocaleVariable'
    let match = 0

    const callback = (level, input) => {
      if (level === 'warn' && input.key === missingLocale) {
        match++
      }
    }

    const l10n = new Localization()
    l10n.registerLogger(callback)
    l10n.get({ locale: missingLocale, isVariable: true })
    l10n.get({ variable: missingLocale })
    expect(match).to.equal(0)
  })
})
