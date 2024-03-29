const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization percentFormat', () => {
  const l10n = new Localization()

  it('should add a percent symbol after a parsed number', () => {
    expect(l10n.percentFormat(123)).to.equal('123 %')
    expect(l10n.percentFormat(1234, { thousand: 'x' })).to.equal('1x234 %')
    expect(l10n.percentFormat(123.4, { decimal: 'd' })).to.equal('123d4 %')
    expect(l10n.percentFormat(null)).to.equal(null)
  })
})
