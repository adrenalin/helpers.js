const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization unregisterLocales', () => {
  it('should have alias in the instance for the static unregisterLocales method', () => {
    const l10n = new Localization()
    expect(l10n.unregisterLocales).to.equal(Localization.unregisterLocales)
  })

  it('should have unregisterLocale alias unregisterLocales method', () => {
    const l10n = new Localization()
    expect(l10n.unregisterLocale).to.equal(Localization.unregisterLocales)
    expect(Localization.unregisterLocale).to.equal(Localization.unregisterLocales)
  })

  it('should unregister the locale given as a string', () => {
    const locales = {
      unregisterAsString: {
        en: 'Unregister test EN',
        fi: 'Unregister test FI'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    expect(l10n.getInLang('en', 'unregisterAsString')).to.equal(locales.unregisterAsString.en)

    l10n.unregisterLocales('unregisterAsString')
    expect(l10n.getInLang('en', 'unregisterAsString')).to.equal('unregisterAsString')
  })

  it('should unregister the locale given as an array', () => {
    const locales = {
      unregisterAsArray1: {
        en: 'Unregister test EN 1',
        fi: 'Unregister test FI 1'
      },
      unregisterAsArray2: {
        en: 'Unregister test EN 2',
        fi: 'Unregister test FI 2'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    expect(l10n.getInLang('en', 'unregisterAsArray1')).to.equal(locales.unregisterAsArray1.en)
    expect(l10n.getInLang('en', 'unregisterAsArray2')).to.equal(locales.unregisterAsArray2.en)

    l10n.unregisterLocales(['unregisterAsArray1', 'unregisterAsArray2'])
    expect(l10n.getInLang('en', 'unregisterAsArray1')).to.equal('unregisterAsArray1')
    expect(l10n.getInLang('en', 'unregisterAsArray2')).to.equal('unregisterAsArray2')
  })

  it('should unregister the locale given as an object', () => {
    const locales = {
      unregisterAsObject: {
        en: 'Unregister test EN 1',
        fi: 'Unregister test FI 1'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    expect(l10n.getInLang('en', 'unregisterAsObject')).to.equal(locales.unregisterAsObject.en)
    expect(l10n.getInLang('fi', 'unregisterAsObject')).to.equal(locales.unregisterAsObject.fi)

    l10n.unregisterLocales({ unregisterAsObject: 'fi' })
    expect(l10n.getInLang('en', 'unregisterAsObject')).not.to.equal('unregisterAsObject')
    expect(l10n.getInLang('fi', 'unregisterAsObject')).to.equal('unregisterAsObject')

    l10n.unregisterLocales({ unregisterAsObject: 'en' })
    expect(l10n.getInLang('en', 'unregisterAsObject')).to.equal('unregisterAsObject')
  })

  it('should unregister the locale given as an object with arrays', () => {
    const locales = {
      unregisterAsObjectWithArrays: {
        en: 'Unregister test EN 1',
        fi: 'Unregister test FI 1'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    expect(l10n.getInLang('en', 'unregisterAsObjectWithArrays')).to.equal(locales.unregisterAsObjectWithArrays.en)
    expect(l10n.getInLang('fi', 'unregisterAsObjectWithArrays')).to.equal(locales.unregisterAsObjectWithArrays.fi)

    l10n.unregisterLocales({ unregisterAsObjectWithArrays: ['fi', 'en'] })
    expect(l10n.getInLang('en', 'unregisterAsObjectWithArrays')).to.equal('unregisterAsObjectWithArrays')
    expect(l10n.getInLang('fi', 'unregisterAsObjectWithArrays')).to.equal('unregisterAsObjectWithArrays')
  })

  it('should skip locales that cannot be unregistered', () => {
    const l10n = new Localization()
    l10n.unregisterLocales({ unregisterMissing: ['fi', 'en'] })
  })
})
