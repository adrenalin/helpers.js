const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization dateFormat', () => {
  it('should output with default locale', () => {
    const l10n = new Localization()
    l10n.unregisterLocales('dateFormat')

    expect(l10n.dateFormat('2021-11-19T12:00:00')).to.equal('2021-11-19')
  })

  it('should output with custom locale', () => {
    const l10n = new Localization()
    l10n.registerLocales({
      dateFormat: {
        en: 'MM/DD/YYYY',
        fi: 'DD-MM-YYYY'
      }
    })

    l10n.setLang('en')
    expect(l10n.dateFormat('2021-11-19T12:00:00')).to.equal('11/19/2021')

    l10n.setLang('fi')
    expect(l10n.dateFormat('2021-11-19T12:00:00')).to.equal('19-11-2021')

    l10n.unregisterLocales('dateFormat')
  })

  it('should throw INVALID_TIMESTAMP error for an invalid timestamp', () => {
    try {
      const l10n = new Localization()
      l10n.dateFormat('abcdef')
      throw new Error('Should have thrown an InvalidTimestamp')
    } catch (err) {
      expect(err).to.be.an.instanceof(Localization.errors.INVALID_TIMESTAMP)
    }
  })

  it('should have a special case for ISO formats', () => {
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
  })
})
