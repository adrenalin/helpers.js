const expect = require('expect.js')
const Localization = require('../../lib/Localization')

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
})
