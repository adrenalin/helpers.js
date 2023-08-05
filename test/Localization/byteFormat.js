const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization byteFormat', () => {
  const l10n = new Localization()

  it('should output the given value appended with unit using the given precision', () => {
    expect(l10n.byteFormat(20)).to.equal('20.0 B')
    expect(l10n.byteFormat(20, 2)).to.equal('20.00 B')
  })

  it('should output the given value appended with quantifier using the given precision', () => {
    expect(l10n.byteFormat(1024, 0)).to.equal('1 kB')
    expect(l10n.byteFormat(1024 * 1024, 2)).to.equal('1.00 MB')
    expect(l10n.byteFormat(100 * 1024 * 1024, 2)).to.equal('100.00 MB')
    expect(l10n.byteFormat(256 * 1024 * 1024 * 1024, 0, 'Hz')).to.equal('256 GHz')
  })

  it('should override power when given', () => {
    expect(l10n.byteFormat(100 * 1024, 3, 'B', 'M')).to.equal('0.098 MB')
    expect(l10n.byteFormat(100 * 1024 * 1024, 0, 'Hz', 'k')).to.equal('102,400 kHz')
  })

  it('should accept a configuration object for the parameters', () => {
    expect(l10n.byteFormat(50, {})).to.equal('50.0 B')
    expect(l10n.byteFormat(50 * 1024, { power: 'k' })).to.equal('50.0 kB')
    expect(l10n.byteFormat(100 * 1024, { precision: 3, power: 'M' })).to.equal('0.098 MB')
    expect(l10n.byteFormat(100 * 1024 * 1024, { precision: 0, unit: 'Hz', power: 'k' })).to.equal('102,400 kHz')
  })
})
