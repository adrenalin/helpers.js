const expect = require('expect.js')
const Localization = require('../../lib/Localization')

describe('lib/Localization numberFormat', () => {
  const l10n = new Localization()

  it('should add a percent symbol after a parsed number', (done) => {
    expect(l10n.percentFormat(123)).to.be('123 %')
    expect(l10n.percentFormat(1234, { thousand: 'x' })).to.be('1x234 %')
    expect(l10n.percentFormat(123.4, { decimal: 'd' })).to.be('123d4 %')
    done()
  })
})
