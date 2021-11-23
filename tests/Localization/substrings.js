const expect = require('expect.js')
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
})
