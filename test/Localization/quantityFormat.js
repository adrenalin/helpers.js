const { expect } = require('chai')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const Localization = require('../../lib/Localization')

describe('lib/Localization quantityFormat', () => {
  const l10n = new Localization()
  const q = Localization.QUANTIFIERS

  it('should require a number or a numeric string as the first argument', () => {
    expect(() => l10n.quantityFormat('foo')).to.throw(InvalidArgument)
  })

  it('should return null for null', () => {
    expect(l10n.quantityFormat(null)).to.eql(null)
  })

  it('should quantify with milli, kilo, mega, billion and trillion', () => {
    expect(l10n.quantityFormat(0.001)).to.eql('1 m', '1 m')
    expect(l10n.quantityFormat(0.001, { unit: 'g' })).to.eql('1 mg', '1 mg')

    expect(l10n.quantityFormat(1.234 * q.k)).to.eql('1.234 k')
    expect(l10n.quantityFormat(1.234 * q.M)).to.eql('1.234 M')
    expect(l10n.quantityFormat(1.234 * q.B)).to.eql('1.234 B')
    expect(l10n.quantityFormat(1.234 * q.T)).to.eql('1.234 T')
    expect(l10n.quantityFormat(1.234 * q.P)).to.eql('1.234 P')
    expect(l10n.quantityFormat(1234 * q.P)).to.eql('1,234 P')
  })

  it('should accept number and string as the first argument', () => {
    expect(l10n.quantityFormat(0.001, 'g')).to.eql('1 mg')
    expect(l10n.quantityFormat('0.001', 'l')).to.eql('1 ml')
  })

  it('should accept an options argument', () => {
    expect(l10n.quantityFormat(0.504, { precision: 0, unit: 'g' })).to.eql('504 mg')
    expect(l10n.quantityFormat(5, { precision: 0, unit: 'g' })).to.eql('5 g')
    expect(l10n.quantityFormat(0.2, { precision: 2, unit: 'g', rounding: 'floor' })).to.eql('200.00 mg')
  })
})
