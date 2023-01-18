const { expect } = require('chai')
const Localization = require('../../lib/Localization')

describe('lib/Localization substrings', () => {
  it('should replace a substring in translation', (done) => {
    const l10n = new Localization()
    l10n.registerLocales({
      hasSubstring: {
        en: 'This is {{ substring }}'
      },
      substring: {
        en: 'working'
      }
    })

    expect(l10n.getInLang('en', 'hasSubstring')).to.eql('This is working')
    done()
  })

  it('should use fallback substring', (done) => {
    const l10n = new Localization()
    l10n.registerLocales({
      hasSubstringFallback: {
        en: 'This is {{ substringFallback }}'
      },
      substringFallback: {
        fi: 'working with fallback'
      }
    })

    l10n.setLang('en')
    l10n.setFallbackLang('fi')

    expect(l10n.get('hasSubstringFallback')).to.eql('This is working with fallback')
    done()
  })

  it('should keep the string intact when substring was not found', (done) => {
    const l10n = new Localization()
    l10n.registerLocales({
      hasSubstringNotFound: {
        en: 'This is {{ substringNotFound }}'
      }
    })

    l10n.setLang('en')
    l10n.setFallbackLang('fi')

    expect(l10n.get('hasSubstringNotFound')).to.eql('This is {{ substringNotFound }}')
    done()
  })

  it('should set the substrings according to the index', (done) => {
    const l10n = new Localization()
    l10n.registerLocale('substringIndexed', { en: '%s2 %s1' })

    expect(l10n.getInLang('en', 'substringIndexed', 1, 2)).to.eql('2 1')
    done()
  })

  it('should format the number substrings', (done) => {
    const l10n = new Localization()
    const precision = 0

    l10n.registerLocale('numberFormatWithoutArguments', { fi: 'Number format without arguments %n' })
    l10n.registerLocale('numberFormatPrecision', { fi: `Number format with precision %n[${precision}]` })
    l10n.registerLocale('numberFormatWithQueryString', { fi: 'Number format with query string arguments %n[thousand=X&decimal=D&precision=1]' })

    const value = 123456.789
    const numberFormatWithoutArguments = l10n.numberFormat(value, { lang: 'fi' })
    const numberFormatWithPrecision = l10n.numberFormat(value, { lang: 'fi', precision })

    expect(l10n.getInLang('fi', 'numberFormatWithoutArguments', value)).to.eql(`Number format without arguments ${numberFormatWithoutArguments}`)
    expect(l10n.getInLang('fi', 'numberFormatPrecision', value)).to.eql(`Number format with precision ${numberFormatWithPrecision}`)
    expect(l10n.getInLang('fi', 'numberFormatWithQueryString', value)).to.eql('Number format with query string arguments 123X456D8')
    done()
  })

  it('should format percent substrings', (done) => {
    const l10n = new Localization()
    const precision = 0

    l10n.registerLocale('percentFormatWithoutArguments', { fi: 'Percent format without arguments %p' })
    l10n.registerLocale('percentFormatPrecision', { fi: `Percent format with precision %p[${precision}]` })

    const value = 123456.789
    const percentFormatWithoutArguments = l10n.percentFormat(value, { lang: 'fi' })
    const percentFormatWithPrecision = l10n.percentFormat(value, { lang: 'fi', precision })

    expect(l10n.getInLang('fi', 'percentFormatWithoutArguments', value)).to.eql(`Percent format without arguments ${percentFormatWithoutArguments}`)
    expect(l10n.getInLang('fi', 'percentFormatPrecision', value)).to.eql(`Percent format with precision ${percentFormatWithPrecision}`)
    done()
  })

  it('should format money substrings', (done) => {
    const l10n = new Localization()
    const precision = 0

    l10n.registerLocale('moneyFormatWithoutArguments', { fi: 'money format without arguments %m' })
    l10n.registerLocale('moneyFormatPrecision', { fi: `money format with precision %m[${precision}]` })

    const value = 123456.789
    const moneyFormatWithoutArguments = l10n.moneyFormat(value, { lang: 'fi' })
    const moneyFormatWithPrecision = l10n.moneyFormat(value, { lang: 'fi', precision })

    expect(l10n.getInLang('fi', 'moneyFormatWithoutArguments', value)).to.eql(`money format without arguments ${moneyFormatWithoutArguments}`)
    expect(l10n.getInLang('fi', 'moneyFormatPrecision', value)).to.eql(`money format with precision ${moneyFormatWithPrecision}`)
    done()
  })

  it('should format the date substrings', (done) => {
    const l10n = new Localization()
    l10n.registerLocale('dateFormat', { fi: 'D.M.YYYY' })
    l10n.registerLocale('dateFormatWithoutArguments', { fi: 'Date format without arguments %d' })
    l10n.registerLocale('dateFormatWithFormat', { fi: 'Date format with format %d[MM/DD/YYYY]' })

    expect(l10n.getInLang('fi', 'dateFormatWithoutArguments', '2022-04-01T12:00:00+03:00')).to.eql('Date format without arguments 1.4.2022')
    expect(l10n.getInLang('fi', 'dateFormatWithFormat', '2022-04-01T12:00:00+03:00')).to.eql('Date format with format 04/01/2022')
    done()
  })

  it('should throw an InvalidFormatter for an undefined formatter', (done) => {
    try {
      const l10n = new Localization()

      l10n.registerLocale('invalidFormatter', { fi: 'Invalid formatter %x' })
      l10n.getInLang('fi', 'invalidFormatter', 'foobar')
      throw new Error('Should have thrown an InvalidFormatter')
    } catch (err) {
      expect(err).to.be.an.instanceof(Localization.errors.INVALID_FORMATTER)
      done()
    }
  })

  it('should skip escaped formatters', (done) => {
    const l10n = new Localization()
    const precision = 0

    l10n.registerLocale('escapedNumberFormatWithoutArguments', { fi: 'Escaped number format without arguments \\%n' })
    l10n.registerLocale('escapedNumberFormatWithFormat', { fi: `Escaped number format with precision \\%n[${precision}]` })

    const value = 123456.789

    expect(l10n.getInLang('fi', 'escapedNumberFormatWithoutArguments', value)).to.eql('Escaped number format without arguments %n')
    expect(l10n.getInLang('fi', 'escapedNumberFormatWithFormat', value)).to.eql(`Escaped number format with precision %n[${precision}]`)
    done()
  })
})
