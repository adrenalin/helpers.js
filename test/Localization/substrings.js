const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization substrings', () => {
  it('should replace a substring in translation', () => {
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
  })

  it('should use fallback substring', () => {
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
  })

  it('should keep the string intact when substring was not found', () => {
    const l10n = new Localization()
    l10n.registerLocales({
      hasSubstringNotFound: {
        en: 'This is {{ substringNotFound }}'
      }
    })

    l10n.setLang('en')
    l10n.setFallbackLang('fi')

    expect(l10n.get('hasSubstringNotFound')).to.eql('This is {{ substringNotFound }}')
  })

  it('should set the substrings according to the index', () => {
    const l10n = new Localization()
    l10n.registerLocale('substringIndexed', { en: '%s2 %s1' })

    expect(l10n.getInLang('en', 'substringIndexed', 1, 2)).to.eql('2 1')
  })

  it('should format the number substrings', () => {
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
  })

  it('should format percent substrings', () => {
    const l10n = new Localization()
    const precision = 0

    l10n.registerLocale('percentFormatWithoutArguments', { fi: 'Percent format without arguments %p' })
    l10n.registerLocale('percentFormatPrecision', { fi: `Percent format with precision %p[${precision}]` })

    const value = 123456.789
    const percentFormatWithoutArguments = l10n.percentFormat(value, { lang: 'fi' })
    const percentFormatWithPrecision = l10n.percentFormat(value, { lang: 'fi', precision })

    expect(l10n.getInLang('fi', 'percentFormatWithoutArguments', value)).to.eql(`Percent format without arguments ${percentFormatWithoutArguments}`)
    expect(l10n.getInLang('fi', 'percentFormatPrecision', value)).to.eql(`Percent format with precision ${percentFormatWithPrecision}`)
  })

  it('should format money substrings', () => {
    const l10n = new Localization()
    const precision = 0

    l10n.registerLocale('moneyFormatWithoutArguments', { fi: 'money format without arguments %m' })
    l10n.registerLocale('moneyFormatPrecision', { fi: `money format with precision %m[${precision}]` })

    const value = 123456.789
    const moneyFormatWithoutArguments = l10n.moneyFormat(value, { lang: 'fi' })
    const moneyFormatWithPrecision = l10n.moneyFormat(value, { lang: 'fi', precision })

    expect(l10n.getInLang('fi', 'moneyFormatWithoutArguments', value)).to.eql(`money format without arguments ${moneyFormatWithoutArguments}`)
    expect(l10n.getInLang('fi', 'moneyFormatPrecision', value)).to.eql(`money format with precision ${moneyFormatWithPrecision}`)
  })

  it('should format the date substrings', () => {
    const l10n = new Localization()
    l10n.registerLocale('dateFormat', { fi: 'D.M.YYYY' })
    l10n.registerLocale('dateFormatWithoutArguments', { fi: 'Date format without arguments %d' })
    l10n.registerLocale('dateFormatWithFormat', { fi: 'Date format with format %d[MM/DD/YYYY]' })

    expect(l10n.getInLang('fi', 'dateFormatWithoutArguments', '2022-04-01T12:00:00+03:00')).to.eql('Date format without arguments 1.4.2022')
    expect(l10n.getInLang('fi', 'dateFormatWithFormat', '2022-04-01T12:00:00+03:00')).to.eql('Date format with format 04/01/2022')
  })

  it('should format integer substrings', () => {
    const l10n = new Localization()
    l10n.registerLocale('integerFormat', { fi: '%i' })
    l10n.registerLocale('integerFormatFloor', { fi: '%i[rounding=floor]' })
    l10n.registerLocale('integerFormatCeil', { fi: '%i[rounding=ceil]' })

    expect(l10n.getInLang('fi', 'integerFormat', '1.2')).to.eql('1')
    expect(l10n.getInLang('fi', 'integerFormat', '1.5')).to.eql('2')
    expect(l10n.getInLang('fi', 'integerFormatFloor', '1.7')).to.eql('1')
    expect(l10n.getInLang('fi', 'integerFormatCeil', '1.2')).to.eql('2')
  })

  it('should format quantified substrings', () => {
    const l10n = new Localization()
    l10n.registerLocale('quantifiedFormat', { fi: '%q' })
    l10n.registerLocale('quantifiedFormatFloor', { fi: '%q[rounding=floor&precision=0]' })
    l10n.registerLocale('quantifiedFormatCeil', { fi: '%q[rounding=ceil&precision=0]' })

    // expect(l10n.getInLang('fi', 'quantifiedFormat', '1.2')).to.eql('1.2')
    // expect(l10n.getInLang('fi', 'quantifiedFormat', '0.001')).to.eql('1 m')
    // expect(l10n.getInLang('fi', 'quantifiedFormat', '1200')).to.eql('1.2 k')
    expect(l10n.getInLang('fi', 'quantifiedFormatFloor', '1.7')).to.eql('1', 'Value rounded down')
    expect(l10n.getInLang('fi', 'quantifiedFormatCeil', '1.2')).to.eql('2', 'Value rounded up')
  })

  it('should throw an InvalidFormatter for an undefined formatter', () => {
    try {
      const l10n = new Localization()

      l10n.registerLocale('invalidFormatter', { fi: 'Invalid formatter %x' })
      l10n.getInLang('fi', 'invalidFormatter', 'foobar')
      throw new Error('Should have thrown an InvalidFormatter')
    } catch (err) {
      expect(err).to.be.an.instanceof(Localization.errors.INVALID_FORMATTER)
    }
  })

  it('should skip escaped formatters', () => {
    const l10n = new Localization()
    const precision = 0

    l10n.registerLocale('escapedNumberFormatWithoutArguments', { fi: 'Escaped number format without arguments \\%n' })
    l10n.registerLocale('escapedNumberFormatWithFormat', { fi: `Escaped number format with precision \\%n[${precision}]` })

    const value = 123456.789

    expect(l10n.getInLang('fi', 'escapedNumberFormatWithoutArguments', value)).to.eql('Escaped number format without arguments %n')
    expect(l10n.getInLang('fi', 'escapedNumberFormatWithFormat', value)).to.eql(`Escaped number format with precision %n[${precision}]`)
  })
})
