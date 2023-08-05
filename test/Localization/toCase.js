const { expect } = require('chai')
const { Localization } = require('../../')

describe('lib/Localization convertCase', () => {
  it('should keep the original case if output case has not been defined', () => {
    const input = 'Lorem ipsum dolor sit amet.'
    expect(Localization.toCase(input)).to.equal(input)
  })

  it('should convert the input string to uppercase', () => {
    const input = 'Lorem ipsum dolor sit amet.'
    const output = 'LOREM IPSUM DOLOR SIT AMET.'

    expect(Localization.toCase(input, 'upper')).to.equal(output)
    expect(Localization.toCase(input, 'uppercase')).to.equal(output)
    expect(Localization.toCase(input, Localization.UPPERCASE)).to.equal(output)
  })

  it('should convert the input string to lowercase', () => {
    const input = 'Lorem ipsum dolor sit amet.'
    const output = 'lorem ipsum dolor sit amet.'

    expect(Localization.toCase(input, 'lower')).to.equal(output)
    expect(Localization.toCase(input, 'lowercase')).to.equal(output)
    expect(Localization.toCase(input, Localization.LOWERCASE)).to.equal(output)
  })

  it('should convert the input string to title case', () => {
    const input = 'lorem ipsum. äö. dolor sit. amet.'
    const output = 'Lorem Ipsum. Äö. Dolor Sit. Amet.'

    expect(Localization.toCase(input, 'title')).to.equal(output)
    expect(Localization.toCase(input, 'titlecase')).to.equal(output)
    expect(Localization.toCase(input, Localization.TITLECASE)).to.equal(output)
  })

  it('should convert the input string to paragraph case', () => {
    const input = 'lorem ipsum. äö äö. dolor sit. amet.'
    const output = 'Lorem ipsum. Äö äö. Dolor sit. Amet.'

    expect(Localization.toCase(input, 'paragraph')).to.equal(output)
    expect(Localization.toCase(input, 'paragraphcase')).to.equal(output)
    expect(Localization.toCase(input, Localization.PARAGRAPHCASE)).to.equal(output)
  })

  it('should convert the input to camel case', () => {
    const input = 'lorem ipsum_dolor. sit amet'
    const output = 'loremIpsumDolorSitAmet'

    expect(Localization.toCase(input, 'camel')).to.equal(output)
    expect(Localization.toCase(input, 'camelcase')).to.equal(output)
    expect(Localization.toCase(input, Localization.CAMELCASE)).to.equal(output)
  })

  it('should convert the input to underscore case', () => {
    const input = ' LOREM ipsumDolor. sit amet'
    const output = 'lorem_ipsum_dolor_sit_amet'

    expect(Localization.toCase(input, 'underscore')).to.equal(output)
    expect(Localization.toCase(input, 'underscorecase')).to.equal(output)
    expect(Localization.toCase(input, Localization.UNDERSCORECASE)).to.equal(output)
  })

  it('should have a shorthand in a class instance', () => {
    const l10n = new Localization()
    expect(l10n.toCase).to.equal(Localization.toCase)
  })
})
