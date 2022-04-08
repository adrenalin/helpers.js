const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('lib/Localization dateFormat', () => {
  it('should output with default locale', (done) => {
    const l10n = new Localization()
    l10n.unregisterLocales('dateFormat')

    expect(l10n.dateFormat('2021-11-19T12:00:00')).to.be('2021-11-19')
    done()
  })

  it('should output with custom locale', (done) => {
    const l10n = new Localization()
    l10n.registerLocales({
      dateFormat: {
        en: 'MM/DD/YYYY',
        fi: 'DD-MM-YYYY'
      }
    })

    l10n.setLang('en')
    expect(l10n.dateFormat('2021-11-19T12:00:00')).to.be('11/19/2021')

    l10n.setLang('fi')
    expect(l10n.dateFormat('2021-11-19T12:00:00')).to.be('19-11-2021')

    l10n.unregisterLocales('dateFormat')
    done()
  })

  it('should throw INVALID_TIMESTAMP error for an invalid timestamp', (done) => {
    try {
      const l10n = new Localization()
      l10n.dateFormat('abcdef')
      throw new Error('Should have thrown an InvalidTimestamp')
    } catch (err) {
      expect(err).to.be.a(Localization.errors.INVALID_TIMESTAMP)
      done()
    }
  })

  it('should have a special case for ISO formats', (done) => {
    const dt = '2022-04-08T04:45:00.000Z'
    const l10n = new Localization()
    expect(l10n.dateFormat(dt, { format: 'iso' })).to.eql('2022-04-08T04:45:00Z')

    // Explicit timezone
    expect(l10n.dateFormat(dt, { format: 'iso', tz: 'Europe/Helsinki' })).to.eql('2022-04-08T07:45:00+03:00')

    // ISO date
    expect(l10n.dateFormat(dt, { format: 'iso-date' })).to.eql('2022-04-08')

    // ISO time
    expect(l10n.dateFormat(dt, { format: 'iso-time' })).to.eql('04:45:00')
    expect(l10n.dateFormat(dt, { format: 'iso-time', tz: 'Europe/Helsinki' })).to.eql('07:45:00')
    done()
  })
})
