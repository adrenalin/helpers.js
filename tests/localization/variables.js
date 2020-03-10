const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('Localization variables', () => {
  it('should accept variable as a locale', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 123 })).to.be('123')
    done()
  })

  it('should automatically format a numeric variable with numberFormat', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 1234 })).to.be('1,234')
    expect(l10n.getInLang('en', { variable: 1.234 })).to.be('1.234')
    done()
  })

  it('should accept a format option for variables', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 1234, format: 'string' })).to.be('1234')
    expect(l10n.getInLang('en', { variable: 1.234, format: 'percent' })).to.be('1.234 %')
    expect(l10n.getInLang('xx', { variable: 1.234, format: 'money' })).to.be('1.23 e')
    done()
  })

  it('should accept precision for variables', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 1234.123, precision: 2 })).to.be('1,234.12')
    done()
  })

  it('should accept a variable as a third argument', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', '%s is placed as number', { variable: 1 })).to.be('1 is placed as number')
    expect(l10n.getInLang('en', '%s is placed as text', { variable: 'foo' })).to.be('foo is placed as text')
    done()
  })
})
