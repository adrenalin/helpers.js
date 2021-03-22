const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('lib/Localization getInLang', () => {
  it('should be able to get localized strings', (done) => {
    const locales = {
      foo: {
        en: 'Foo',
        fi: 'Foo'
      }
    }

    const l10n = new Localization()
    const rval = l10n.registerLocales(locales)
    expect(l10n.getInLang('en', 'foo')).to.be(locales.foo.en)
    expect(l10n.getInLang('fi', 'foo')).to.be(locales.foo.fi)
    expect(rval).to.be(l10n)
    done()
  })

  it('should be able to get the set fallback language', (done) => {
    const lang = 'fi'
    const l10n = new Localization()
    l10n.setFallbackLang(lang)
    expect(l10n.getFallbackLang()).to.be(lang)
    done()
  })

  it('should return the original string if locale was not found', (done) => {
    const l10n = new Localization()
    const locale = 'locale-not-found'

    expect(l10n.getInLang('fi', locale)).to.be(locale)
    done()
  })

  it('should return empty string if there was no locale provided', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('fi', null)).to.be('')
    expect(l10n.getInLang('fi', undefined)).to.be('')
    expect(l10n.getInLang('fi', 'undefined', null)).to.be('undefined')
    done()
  })

  it('should inject %s strings', (done) => {
    const locales = {
      parameterSequential: {
        en: 'Parameter sequential %s'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    expect(l10n.getInLang('en', 'parameterSequential', '1')).to.be('Parameter sequential 1')
    done()
  })

  it('should inject %s[n] strings', (done) => {
    const locales = {
      parameterNonSequential: {
        en: 'Parameter non-sequential %s2 %s1'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    expect(l10n.getInLang('en', 'parameterNonSequential', '1', '2')).to.be('Parameter non-sequential 2 1')
    done()
  })

  it('should accept an object defintion for locale', (done) => {
    const locales = {
      foo: {
        en: 'Foo',
        fi: 'Foo'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    expect(l10n.getInLang('en', { locale: 'foo' })).to.be(locales.foo.en)
    done()
  })

  it('should accept a default value for locale object', (done) => {
    const defaultValue = 'default-value'
    const l10n = new Localization()

    expect(l10n.getInLang('en', { locale: 'undefined-locale', default: defaultValue })).to.be(defaultValue)
    done()
  })

  it('should respect case definitions in object', (done) => {
    const locales = {
      caseTestString: {
        en: '%s %s %s %s'
      }
    }

    const params = [
      {
        locale: 'lorem',
        case: 'title'
      },
      {
        locale: 'IPSUM',
        case: 'lower'
      },
      {
        locale: 'dolor',
        case: 'upper'
      },
      {
        locale: 'sit. amet.',
        case: 'paragraph'
      }
    ]

    const l10n = new Localization()
    l10n.registerLocales(locales)

    expect(l10n.getInLang('en', 'caseTestString', ...params))
      .to.be('Lorem ipsum DOLOR Sit. Amet.')

    done()
  })

  it('should throw an exception when there is a parameter count mismatch', (done) => {
    const locales = {
      paramMismatchOrder: {
        en: '%s %s'
      },
      paramMismatchNumbered: {
        en: '%s2'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    try {
      l10n.getInLang('en', 'paramMismatchOrder', 'foo')
      return done(new Error('Should have thrown an error'))
    } catch (err) {
    }

    try {
      l10n.getInLang('en', 'paramMismatchNumbered', 'foo')
      return done(new Error('Should have thrown an error'))
    } catch (err) {
    }

    done()
  })

  it('should throw an exception when there is an illegal parameter', (done) => {
    const locales = {
      paramMismatchOrder: {
        en: '%s %s'
      },
      paramMismatchNumbered: {
        en: '%s2'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    try {
      l10n.getInLang('en', 'paramMismatchOrder', { key: 'foo' }, { invalid: true })
      return done(new Error('Should have thrown an error'))
    } catch (err) {
    }

    done()
  })

  it('should accept a default value for locale object', (done) => {
    const defaultValue = 'default-value'
    const l10n = new Localization()

    expect(l10n.getInLang('en', { locale: 'undefined-locale', default: defaultValue })).to.be(defaultValue)
    done()
  })

  it('should refer to an alias', (done) => {
    const locales = {
      aliasValue: {
        en: 'Aliased value'
      },
      aliasTest: {
        alias: 'aliasValue'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    expect(l10n.getInLang('en', 'aliasTest')).to.be(locales.aliasValue.en)

    done()
  })

  it('should return quantified strings', (done) => {
    const locales = {
      quantifiedTestFor1: {
        en: 'Quantified value for one'
      },
      quantifiedTestForN: {
        en: 'Quantified value for %s'
      },
      quantifiedTestDefault: {
        en: 'Quantified default value'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    const quantifiers = {
      1: 'quantifiedTestFor1',
      2: 'quantifiedTestForN',
      default: 'quantifiedTestDefault'
    }

    expect(l10n.getInLang('en', { amount: 1, quantifiers })).to.be(locales.quantifiedTestFor1.en)
    expect(l10n.getInLang('en', { amount: 2, quantifiers })).to.be('Quantified value for 2')
    expect(l10n.getInLang('en', { amount: 3, quantifiers })).to.be(locales.quantifiedTestDefault.en)
    expect(l10n.getInLang('en', { amount: null, quantifiers })).to.be(locales.quantifiedTestDefault.en)
    done()
  })

  it('should return the original string when there is no default quantifier', (done) => {
    const l10n = new Localization()

    const quantifiers = {
      1: 'quantifiedTestFor1',
      2: 'quantifiedTestForN'
    }

    const locale = 'quantifierDefaultValue'

    expect(l10n.getInLang('en', { key: locale, amount: 3, quantifiers })).to.be(locale)
    expect(l10n.getInLang('en', { key: locale, amount: null, quantifiers })).to.be(locale)
    done()
  })

  it('should accept and convert numbers to strings', (done) => {
    const l10n = new Localization()
    expect(l10n.getInLang('en', 1)).to.be('1')
    expect(l10n.getInLang('en', Math.PI)).to.be(Math.PI.toString())
    done()
  })

  it('should give the localized string with get', (done) => {
    const locales = {
      getTest: {
        en: 'Get test EN',
        fi: 'Get test FI'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    l10n.setLang('en')
    expect(l10n.get('getTest')).to.be(locales.getTest.en)

    l10n.setLang('fi')
    expect(l10n.get('getTest')).to.be(locales.getTest.fi)

    done()
  })

  it('should give singular/plural strings with getByCount', (done) => {
    const locales = {
      getByCount1: {
        en: 'Get by count: one'
      },
      getByCountN: {
        en: 'Get by count: %s'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    expect(l10n.getByCount('getByCount1', 'getByCountN', 0)).to.be('Get by count: 0')
    expect(l10n.getByCount('getByCount1', 'getByCountN', 1)).to.be(locales.getByCount1.en)
    expect(l10n.getByCount('getByCount1', 'getByCountN', 2)).to.be('Get by count: 2')

    done()
  })

  it('should override language when explicitly defined', (done) => {
    const locales = {
      overrideLang: {
        en: 'EN',
        fi: 'FI'
      }
    }

    const l10n = new Localization()
    const rval = l10n.registerLocales(locales)
    expect(l10n.getInLang('en', { locale: 'overrideLang', lang: 'fi' })).to.be(locales.overrideLang.fi)
    expect(l10n.getInLang('fi', { locale: 'overrideLang', lang: 'en' })).to.be(locales.overrideLang.en)
    expect(rval).to.be(l10n)
    done()
  })

  it('should return empty string for an empty input', (done) => {
    const l10n = new Localization()
    expect(l10n.getInLang('fi', '')).to.be('')
    expect(l10n.getInLang('fi', null)).to.be('')
    expect(l10n.getInLang('fi', undefined)).to.be('')
    expect(l10n.getInLang('fi', { variable: '' })).to.be('')
    expect(l10n.getInLang('fi', { variable: null })).to.be('')
    expect(l10n.getInLang('fi', { variable: undefined })).to.be('')
    expect(l10n.getInLang('fi', 'emptyString', { variable: '' })).to.be('emptyString')
    expect(l10n.getInLang('fi', 'emptyString', { variable: null })).to.be('emptyString')
    expect(l10n.getInLang('fi', 'emptyString', { variable: undefined })).to.be('emptyString')
    done()
  })
})
