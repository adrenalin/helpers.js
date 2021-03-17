const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('Localization getLocales', () => {
  it('should return all locales', (done) => {
    const locales = {
      foo: {
        en: 'Foo en',
        fi: 'Foo fi'
      },
      bar: {
        en: 'Bar en',
        fi: 'Bar fi'
      }
    }

    Localization.registerLocales(locales)
    const l10n = new Localization()

    const savedStatic = Localization.getLocales()
    const savedInstance = l10n.getLocales()

    for (const key in locales) {
      expect(locales[key]).to.eql(savedStatic[key])
      expect(locales[key]).to.eql(savedInstance[key])
    }

    done()
  })

  it('should return all locales by language', (done) => {
    const locales = {
      foo: {
        en: 'Foo en',
        fi: 'Foo fi'
      },
      bar: {
        en: 'Bar en',
        fi: 'Bar fi'
      }
    }

    Localization.registerLocales(locales)
    const l10n = new Localization()

    const savedStatic = Localization.getLocales('en')
    const savedInstance = l10n.getLocales('fi')

    for (const key in locales) {
      expect(locales[key].en).to.eql(savedStatic[key])
      expect(locales[key].fi).to.eql(savedInstance[key])
    }

    done()
  })
})
