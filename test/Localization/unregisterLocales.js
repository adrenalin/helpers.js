const { expect } = require('chai')
const Localization = require('../../lib/Localization')

describe('lib/Localization unregisterLocales', () => {
  it('should have alias in the instance for the static unregisterLocales method', (done) => {
    const l10n = new Localization()
    expect(l10n.unregisterLocales).to.equal(Localization.unregisterLocales)
    done()
  })

  it('should have unregisterLocale alias unregisterLocales method', (done) => {
    const l10n = new Localization()
    expect(l10n.unregisterLocale).to.equal(Localization.unregisterLocales)
    expect(Localization.unregisterLocale).to.equal(Localization.unregisterLocales)
    done()
  })

  it('should unregister the locale given as a string', (done) => {
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

    done()
  })

  it('should unregister the locale given as an array', (done) => {
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

    done()
  })

  it('should unregister the locale given as an object', (done) => {
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

    done()
  })

  it('should unregister the locale given as an object with arrays', (done) => {
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

    done()
  })

  it('should skip locales that cannot be unregistered', (done) => {
    const l10n = new Localization()
    l10n.unregisterLocales({ unregisterMissing: ['fi', 'en'] })
    done()
  })
})
