const expect = require('expect.js')
const Localization = require('../../localization')

describe('Localization getInLang', () => {
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
})
