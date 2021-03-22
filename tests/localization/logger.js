const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('lib/Localization logger', () => {
  it('should have a static method to register a logger that accepts a function', (done) => {
    const callback = () => {

    }

    expect(Localization.registerLogger).to.be.a('function')
    expect(Localization.registerLogger).withArgs(null).to.throwError()
    expect(Localization.registerLogger).withArgs(callback).not.to.throwError()
    done()
  })

  it('should have an instance method to register a logger', (done) => {
    const l10n = new Localization()
    expect(l10n.registerLogger).to.be.a('function')
    expect(l10n.registerLogger(() => {})).to.be(l10n)
    done()
  })

  it('should use the logger', (done) => {
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

    expect(match).to.be(1)
    expect(rval).to.be(l10n)
    done()
  })

  it('should pass to logger a warning about missing locale, but only once', (done) => {
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

    expect(match).to.be(1)
    done()
  })

  it('should not pass to logger anything marked as a variable', (done) => {
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
    expect(match).to.be(0)
    done()
  })
})
