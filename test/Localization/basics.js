const { expect } = require('chai')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const Localization = require('../../lib/Localization')

describe('lib/Localization basics', () => {
  it('should be a class that can be initialized', () => {
    const l10n = new Localization()
    expect(l10n).to.be.an.instanceof(Localization)
  })

  it('should have both static and instance errors', () => {
    const l10n = new Localization()

    expect(l10n.errors).to.be.an('object')
    expect(Localization.errors).to.be.an('object')
    expect(Localization.errors).to.equal(l10n.errors)

    expect(Localization.INVALID_TIMESTAMP).to.equal(Localization.errors.INVALID_TIMESTAMP)
  })

  it('should accept a language as an argument', () => {
    const lang = 'fi'
    const l10n = new Localization(lang)
    expect(l10n.lang).to.equal(lang)
  })

  it('should have a shorthand in a class instance', () => {
    const l10n = new Localization()
    expect(l10n.registerLocales).to.equal(Localization.registerLocales)
  })

  it('should register locales', () => {
    const locales = {
      foo: {
        en: 'Foo',
        fi: 'Foo'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
  })

  it('should have registerLocale', () => {
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
  })

  it('should be able to set the language', () => {
    const lang = 'fi'
    const l10n = new Localization()
    const rval = l10n.setLang(lang)
    expect(l10n.lang).to.equal(lang)
    expect(rval).to.equal(l10n)
  })

  it('should reject an empty string when setting the language', () => {
    const l10n = new Localization()
    expect(() => l10n.setLang('')).to.throw()
  })

  it('should require a string when setting the language', () => {
    const l10n = new Localization()
    expect(() => l10n.setLang({})).to.throw()
  })

  it('should be able to get the set language', () => {
    const lang = 'fi'
    const l10n = new Localization()
    l10n.setLang(lang)
    expect(l10n.getLang()).to.equal(lang)
  })

  it('should reject to register invalid locales', () => {
    const l10n = new Localization()
    expect(() => l10n.registerLocales('foo')).to.throw()
    expect(() => l10n.registerLocales({ foo: 'bar' })).to.throw()
    expect(() => l10n.registerLocales({ foo: [] })).to.throw()
    expect(() => l10n.registerLocales({ foo: { bar: [] } })).to.throw()
  })

  it('should be able to use fallback language', () => {
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
  })

  it('should reject an empty string when setting the fallback language', () => {
    const l10n = new Localization()
    expect(() => l10n.setFallbackLang(''))
  })

  it('should require a string when setting the fallback language', () => {
    const l10n = new Localization()
    expect(() => l10n.setFallbackLang({}))
  })

  it('should spread an array', () => {
    const l10n = new Localization()
    l10n.registerLocales({
      testSpreadAnArray: {
        fi: '%s %s %s'
      }
    })

    expect(l10n.getInLang('fi', ['testSpreadAnArray', 1, 2, 3])).to.eql('1 2 3')
  })

  it('should get valid rounded numbers', () => {
    expect(() => Localization.getRoundedNumber('foo')).to.throw(InvalidArgument)

    expect(Localization.getRoundedNumber(1.234)).to.eql(1.234, 'No precision given, do not round')
    expect(Localization.getRoundedNumber(1.234, 1, 'ceil')).to.eql(1.3, 'Ceil to one decimal')
    expect(Localization.getRoundedNumber(1.28, 1, 'floor')).to.eql(1.2, 'Floor to one decimal')
    expect(Localization.getRoundedNumber(123, -1)).to.eql(120, 'Round to closest tens')
  })
})
