const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization timeFormat', () => {
  it('should output with default locale', () => {
    const l10n = new Localization()
    l10n.unregisterLocales('timeFormat')

    expect(l10n.timeFormat('12:00:00')).to.equal('12:00:00')
  })

  it('should output with custom locale', () => {
    const l10n = new Localization()
    l10n.registerLocales({
      timeFormat: {
        en: 'HH:mm',
        fi: 'HH.mm'
      }
    })

    l10n.setLang('en')
    expect(l10n.timeFormat('2021-11-19T12:00:00')).to.equal('12:00')

    l10n.setLang('fi')
    expect(l10n.timeFormat('2021-11-19T12:00:00')).to.equal('12.00')

    l10n.unregisterLocales('timeFormat')
  })

  it('should throw INVALID_TIMESTAMP error for an invalid timestamp', () => {
    const l10n = new Localization()
    expect(() => l10n.timeFormat('abcdef')).to.throw(Localization.errors.INVALID_TIMESTAMP)
  })
})
