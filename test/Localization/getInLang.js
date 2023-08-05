const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization getInLang', () => {
  it('should be able to get localized strings', () => {
    const locales = {
      foo: {
        en: 'Foo',
        fi: 'Foo'
      }
    }

    const l10n = new Localization()
    const rval = l10n.registerLocales(locales)
    expect(l10n.getInLang('en', 'foo')).to.equal(locales.foo.en)
    expect(l10n.getInLang('fi', 'foo')).to.equal(locales.foo.fi)
    expect(rval).to.equal(l10n)
  })

  it('should be able to get the set fallback language', () => {
    const lang = 'fi'
    const l10n = new Localization()
    l10n.setFallbackLang(lang)
    expect(l10n.getFallbackLang()).to.equal(lang)
  })

  it('should return the original string if locale was not found', () => {
    const l10n = new Localization()
    const locale = 'locale-not-found'

    expect(l10n.getInLang('fi', locale)).to.equal(locale)
  })

  it('should return empty string if there was no locale provided', () => {
    const l10n = new Localization()

    expect(l10n.getInLang('fi', null)).to.equal('')
    expect(l10n.getInLang('fi', undefined)).to.equal('')
    expect(l10n.getInLang('fi', 'undefined', null)).to.equal('undefined')
  })

  it('should inject %s strings', () => {
    const locales = {
      parameterSequential: {
        en: 'Parameter sequential %s'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    expect(l10n.getInLang('en', 'parameterSequential', '1')).to.equal('Parameter sequential 1')
  })

  it('should inject %s[n] strings', () => {
    const locales = {
      parameterNonSequential: {
        en: 'Parameter non-sequential %s2 %s1'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    expect(l10n.getInLang('en', 'parameterNonSequential', '1', '2')).to.equal('Parameter non-sequential 2 1')
  })

  it('should accept an object defintion for locale', () => {
    const locales = {
      foo: {
        en: 'Foo',
        fi: 'Foo'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)
    expect(l10n.getInLang('en', { locale: 'foo' })).to.equal(locales.foo.en)
  })

  it('should accept a default value for locale object', () => {
    const defaultValue = 'default-value'
    const l10n = new Localization()

    expect(l10n.getInLang('en', { locale: 'undefined-locale', default: defaultValue })).to.equal(defaultValue)
  })

  it('should respect case definitions in object', () => {
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
      .to.equal('Lorem ipsum DOLOR Sit. Amet.')
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
    try {
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

      l10n.getInLang('en', 'paramMismatchOrder', { key: 'foo' }, { invalid: true })
      return done(new Error('Should have thrown an error'))
    } catch (err) {
      done()
    }
  })

  it('should accept a default value for locale object', () => {
    const defaultValue = 'default-value'
    const l10n = new Localization()

    expect(l10n.getInLang('en', { locale: 'undefined-locale', default: defaultValue })).to.equal(defaultValue)
  })

  it('should refer to an alias', () => {
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
    expect(l10n.getInLang('en', 'aliasTest')).to.equal(locales.aliasValue.en)
  })

  it('should return quantified strings', () => {
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

    expect(l10n.getInLang('en', { amount: 1, quantifiers })).to.equal(locales.quantifiedTestFor1.en)
    expect(l10n.getInLang('en', { amount: 2, quantifiers })).to.equal('Quantified value for 2')
    expect(l10n.getInLang('en', { amount: 3, quantifiers })).to.equal(locales.quantifiedTestDefault.en)
    expect(l10n.getInLang('en', { amount: null, quantifiers })).to.equal(locales.quantifiedTestDefault.en)
  })

  it('should return the original string when there is no default quantifier', () => {
    const l10n = new Localization()

    const quantifiers = {
      1: 'quantifiedTestFor1',
      2: 'quantifiedTestForN'
    }

    const locale = 'quantifierDefaultValue'

    expect(l10n.getInLang('en', { key: locale, amount: 3, quantifiers })).to.equal(locale)
    expect(l10n.getInLang('en', { key: locale, amount: null, quantifiers })).to.equal(locale)
  })

  it('should accept and convert numbers to strings', () => {
    const l10n = new Localization()
    expect(l10n.getInLang('en', 1)).to.equal('1')
    expect(l10n.getInLang('en', Math.PI)).to.equal(Math.PI.toString())
  })

  it('should give the localized string with get', () => {
    const locales = {
      getTest: {
        en: 'Get test EN',
        fi: 'Get test FI'
      }
    }

    const l10n = new Localization()
    l10n.registerLocales(locales)

    l10n.setLang('en')
    expect(l10n.get('getTest')).to.equal(locales.getTest.en)

    l10n.setLang('fi')
    expect(l10n.get('getTest')).to.equal(locales.getTest.fi)
  })

  it('should give singular/plural strings with getByCount', () => {
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

    expect(l10n.getByCount('getByCount1', 'getByCountN', 0)).to.equal('Get by count: 0')
    expect(l10n.getByCount('getByCount1', 'getByCountN', 1)).to.equal(locales.getByCount1.en)
    expect(l10n.getByCount('getByCount1', 'getByCountN', 2)).to.equal('Get by count: 2')
  })

  it('should override language when explicitly defined', () => {
    const locales = {
      overrideLang: {
        en: 'EN',
        fi: 'FI'
      }
    }

    const l10n = new Localization()
    const rval = l10n.registerLocales(locales)
    expect(l10n.getInLang('en', { locale: 'overrideLang', lang: 'fi' })).to.equal(locales.overrideLang.fi)
    expect(l10n.getInLang('fi', { locale: 'overrideLang', lang: 'en' })).to.equal(locales.overrideLang.en)
    expect(rval).to.equal(l10n)
  })

  it('should return empty string for an empty input', () => {
    const l10n = new Localization()
    expect(l10n.getInLang('fi', '')).to.equal('')
    expect(l10n.getInLang('fi', null)).to.equal('')
    expect(l10n.getInLang('fi', undefined)).to.equal('')
    expect(l10n.getInLang('fi', { variable: '' })).to.equal('')
    expect(l10n.getInLang('fi', { variable: null })).to.equal('')
    expect(l10n.getInLang('fi', { variable: undefined })).to.equal('')
    expect(l10n.getInLang('fi', 'emptyString', { variable: '' })).to.equal('emptyString')
    expect(l10n.getInLang('fi', 'emptyString', { variable: null })).to.equal('emptyString')
    expect(l10n.getInLang('fi', 'emptyString', { variable: undefined })).to.equal('emptyString')
  })
})
