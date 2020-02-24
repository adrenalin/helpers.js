const expect = require('expect.js')
const Localization = require('../../lib/localization')

describe('Localization basics', () => {
  it('should be a class that can be initialized', (done) => {
    try {
      const l10n = new Localization()
      expect(l10n).to.be.a(Localization)
      done()
    } catch (err) {
      done(err)
    }
  })

  it('should accept a language as an argument', (done) => {
    const lang = 'fi'
    const l10n = new Localization(lang)
    expect(l10n.lang).to.be(lang)
    done()
  })

  it('should have a shorthand in a class instance', (done) => {
    const l10n = new Localization()
    expect(l10n.registerLocales).to.be(Localization.registerLocales)
    done()
  })

  it('should register locales', (done) => {
    const locales = {
      foo: {
        en: 'Foo',
        fi: 'Foo'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    done()
  })

  it('should be able to set the language', (done) => {
    const lang = 'fi'
    const l10n = new Localization()
    const rval = l10n.setLang(lang)
    expect(l10n.lang).to.be(lang)
    expect(rval).to.be(l10n)
    done()
  })

  it('should reject an empty string when setting the language', (done) => {
    try {
      const l10n = new Localization()
      l10n.setLang('')
      done(new Error('Should have thrown an error'))
    } catch (err) {
      done()
    }
  })

  it('should require a string when setting the language', (done) => {
    try {
      const l10n = new Localization()
      l10n.setLang({})
      done(new Error('Should have thrown an error'))
    } catch (err) {
      done()
    }
  })

  it('should be able to get the set language', (done) => {
    const lang = 'fi'
    const l10n = new Localization()
    l10n.setLang(lang)
    expect(l10n.getLang()).to.be(lang)
    done()
  })

  it('should reject to register invalid locales', (done) => {
    const l10n = new Localization()
    expect(l10n.registerLocales).withArgs('foo').to.throwError()
    expect(l10n.registerLocales).withArgs({ foo: 'bar' }).to.throwError()
    expect(l10n.registerLocales).withArgs({ foo: [] }).to.throwError()
    expect(l10n.registerLocales).withArgs({ foo: { bar: [] } }).to.throwError()
    done()
  })

  it('should be able to use fallback language', (done) => {
    const locales = {
      foo: {
        en: 'Foo'
      }
    }

    const l10n = new Localization()
    const rval = l10n.setFallbackLang('en')
    l10n.registerLocales(locales)
    expect(l10n.getInLang('fi', 'foo')).to.be(locales.foo.en)
    expect(rval).to.be(l10n)
    done()
  })

  it('should reject an empty string when setting the fallback language', (done) => {
    try {
      const l10n = new Localization()
      l10n.setFallbackLang('')
      done(new Error('Should have thrown an error'))
    } catch (err) {
      done()
    }
  })

  it('should require a string when setting the fallback language', (done) => {
    try {
      const l10n = new Localization()
      l10n.setFallbackLang({})
      done(new Error('Should have thrown an error'))
    } catch (err) {
      done()
    }
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

    expect(l10n.getInLang('en', 'unregisterAsString')).to.be(locales.unregisterAsString.en)

    l10n.unregisterLocales('unregisterAsString')
    expect(l10n.getInLang('en', 'unregisterAsString')).to.be('unregisterAsString')

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

    expect(l10n.getInLang('en', 'unregisterAsArray1')).to.be(locales.unregisterAsArray1.en)
    expect(l10n.getInLang('en', 'unregisterAsArray2')).to.be(locales.unregisterAsArray2.en)

    l10n.unregisterLocales(['unregisterAsArray1', 'unregisterAsArray2'])
    expect(l10n.getInLang('en', 'unregisterAsArray1')).to.be('unregisterAsArray1')
    expect(l10n.getInLang('en', 'unregisterAsArray2')).to.be('unregisterAsArray2')

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

    expect(l10n.getInLang('en', 'unregisterAsObject')).to.be(locales.unregisterAsObject.en)
    expect(l10n.getInLang('fi', 'unregisterAsObject')).to.be(locales.unregisterAsObject.fi)

    l10n.unregisterLocales({ unregisterAsObject: 'fi' })
    expect(l10n.getInLang('en', 'unregisterAsObject')).not.to.be('unregisterAsObject')
    expect(l10n.getInLang('fi', 'unregisterAsObject')).to.be('unregisterAsObject')

    l10n.unregisterLocales({ unregisterAsObject: 'en' })
    expect(l10n.getInLang('en', 'unregisterAsObject')).to.be('unregisterAsObject')

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

    expect(l10n.getInLang('en', 'unregisterAsObjectWithArrays')).to.be(locales.unregisterAsObjectWithArrays.en)
    expect(l10n.getInLang('fi', 'unregisterAsObjectWithArrays')).to.be(locales.unregisterAsObjectWithArrays.fi)

    l10n.unregisterLocales({ unregisterAsObjectWithArrays: ['fi', 'en'] })
    expect(l10n.getInLang('en', 'unregisterAsObjectWithArrays')).to.be('unregisterAsObjectWithArrays')
    expect(l10n.getInLang('fi', 'unregisterAsObjectWithArrays')).to.be('unregisterAsObjectWithArrays')

    done()
  })

  it('should skip locales that cannot be unregistered', (done) => {
    const l10n = new Localization()
    l10n.unregisterLocales({ unregisterMissing: ['fi', 'en'] })
    done()
  })
})
