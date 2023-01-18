const { expect } = require('chai')
const Localization = require('../../lib/Localization')

describe('lib/Localization basics', () => {
  it('should be a class that can be initialized', (done) => {
    try {
      const l10n = new Localization()
      expect(l10n).to.be.an.instanceof(Localization)
      done()
    } catch (err) {
      done(err)
    }
  })

  it('should have both static and instance errors', (done) => {
    const l10n = new Localization()

    expect(l10n.errors).to.be.an('object')
    expect(Localization.errors).to.be.an('object')
    expect(Localization.errors).to.equal(l10n.errors)

    expect(Localization.INVALID_TIMESTAMP).to.equal(Localization.errors.INVALID_TIMESTAMP)
    done()
  })

  it('should accept a language as an argument', (done) => {
    const lang = 'fi'
    const l10n = new Localization(lang)
    expect(l10n.lang).to.equal(lang)
    done()
  })

  it('should have a shorthand in a class instance', (done) => {
    const l10n = new Localization()
    expect(l10n.registerLocales).to.equal(Localization.registerLocales)
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

  it('should have registerLocale', (done) => {
    const locales = {
      registerLocale: {
        en: 'Register locale via instance method'
      },
      registerLocaleStatic: {
        en: 'Register locale via static method'
      }
    }
    const l10n = new Localization()
    l10n.registerLocale('registerLocale', locales.registerLocale)
    Localization.registerLocale('registerLocaleStatic', locales.registerLocaleStatic)

    expect(l10n.getInLang('en', 'registerLocale')).to.eql(locales.registerLocale.en)
    expect(l10n.getInLang('en', 'registerLocaleStatic')).to.eql(locales.registerLocaleStatic.en)
    done()
  })

  it('should be able to set the language', (done) => {
    const lang = 'fi'
    const l10n = new Localization()
    const rval = l10n.setLang(lang)
    expect(l10n.lang).to.equal(lang)
    expect(rval).to.equal(l10n)
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
    expect(l10n.getLang()).to.equal(lang)
    done()
  })

  it('should reject to register invalid locales', (done) => {
    const l10n = new Localization()
    expect(() => l10n.registerLocales('foo')).to.throw()
    expect(() => l10n.registerLocales({ foo: 'bar' })).to.throw()
    expect(() => l10n.registerLocales({ foo: [] })).to.throw()
    expect(() => l10n.registerLocales({ foo: { bar: [] } })).to.throw()
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
    expect(l10n.getInLang('fi', 'foo')).to.equal(locales.foo.en)
    expect(rval).to.equal(l10n)
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

  it('should spread an array', (done) => {
    const l10n = new Localization()
    l10n.registerLocales({
      testSpreadAnArray: {
        fi: '%s %s %s'
      }
    })

    expect(l10n.getInLang('fi', ['testSpreadAnArray', 1, 2, 3])).to.eql('1 2 3')
    done()
  })
})
