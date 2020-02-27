const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('Localization moneyFormat', () => {
  it('should output with default locale', (done) => {
    const l10n = new Localization()
    l10n.unregisterLocales('moneyFormat')

    expect(l10n.moneyFormat(10, true)).to.be('10.00 e')
    expect(l10n.moneyFormat(10, false)).to.be('10 e')
    done()
  })

  it('should output with custom locale', (done) => {
    const l10n = new Localization()
    l10n.registerLocales({
      moneyFormat: {
        en: '$%s',
        fi: '€%s'
      },
      decimalSeparator: {
        en: 'x',
        fi: 'X'
      }
    })

    l10n.setLang('en')
    expect(l10n.moneyFormat(10)).to.be('$10x00')

    l10n.setLang('fi')
    expect(l10n.moneyFormat(10)).to.be('€10X00')

    l10n.unregisterLocales('moneyFormat')
    l10n.unregisterLocales('decimalSeparator')
    done()
  })
})
