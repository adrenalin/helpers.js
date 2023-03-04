const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization variables', () => {
  it('should accept variable as a locale', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 123 })).to.equal('123')
    done()
  })

  it('should automatically format a numeric variable with numberFormat', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 1234 })).to.equal('1,234')
    expect(l10n.getInLang('en', { variable: 1.234 })).to.equal('1.234')
    done()
  })

  it('should accept a format option for variables', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 1234, format: 'string' })).to.equal('1234')
    expect(l10n.getInLang('en', { variable: 1.234, format: 'percent' })).to.equal('1.234 %')
    expect(l10n.getInLang('xx', { variable: 1.234, format: 'money' })).to.equal('1.23 e')
    done()
  })

  it('should accept precision for variables', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { variable: 1234.123, precision: 2 })).to.equal('1,234.12')
    done()
  })

  it('should accept a variable as a third argument', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', '%s is placed as number', { variable: 1 })).to.equal('1 is placed as number')
    expect(l10n.getInLang('en', '%s is placed as text', { variable: 'foo' })).to.equal('foo is placed as text')
    done()
  })

  it('should accept a variable with the locale', (done) => {
    const l10n = new Localization()

    expect(l10n.getInLang('en', { locale: '%s is placed as number', variable: 1 })).to.equal('1 is placed as number')
    expect(l10n.getInLang('en', { locale: '%s is placed as text', variable: 'foo' })).to.equal('foo is placed as text')
    done()
  })

  it('should accept variables as an array', (done) => {
    const l10n = new Localization()
    expect(l10n.getInLang('en', { locale: '%s and %s are placed as text', variable: ['foo', 'bar'] })).to.equal('foo and bar are placed as text')
    done()
  })

  it('should accept variables as an array of objects', (done) => {
    const l10n = new Localization()
    expect(l10n.getInLang('en', { locale: '%s is given as number with precision', variable: [{ variable: 1, precision: 2 }] })).to.equal('1.00 is given as number with precision')
    done()
  })
})
