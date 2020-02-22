const expect = require('expect.js')
const Localization = require('../../localization')

describe('Localization convertCase', () => {
  it('should keep the original case if output case has not been defined', (done) => {
    const input = 'Lorem ipsum dolor sit amet.'
    expect(Localization.toCase(input)).to.be(input)
    done()
  })

  it('should convert the input string to uppercase', (done) => {
    const input = 'Lorem ipsum dolor sit amet.'
    const output = 'LOREM IPSUM DOLOR SIT AMET.'

    expect(Localization.toCase(input, 'upper')).to.be(output)
    expect(Localization.toCase(input, 'uppercase')).to.be(output)
    expect(Localization.toCase(input, Localization.UPPERCASE)).to.be(output)
    done()
  })

  it('should convert the input string to lowercase', (done) => {
    const input = 'Lorem ipsum dolor sit amet.'
    const output = 'lorem ipsum dolor sit amet.'

    expect(Localization.toCase(input, 'lower')).to.be(output)
    expect(Localization.toCase(input, 'lowercase')).to.be(output)
    expect(Localization.toCase(input, Localization.LOWERCASE)).to.be(output)
    done()
  })

  it('should convert the input string to titlecase', (done) => {
    const input = 'lorem ipsum. dolor sit. amet.'
    const output = 'Lorem Ipsum. Dolor Sit. Amet.'

    expect(Localization.toCase(input, 'title')).to.be(output)
    expect(Localization.toCase(input, 'titlecase')).to.be(output)
    expect(Localization.toCase(input, Localization.TITLECASE)).to.be(output)
    done()
  })

  it('should convert the input string to paragraphcase', (done) => {
    const input = 'lorem ipsum. dolor sit. amet.'
    const output = 'Lorem ipsum. Dolor sit. Amet.'

    expect(Localization.toCase(input, 'paragraph')).to.be(output)
    expect(Localization.toCase(input, 'paragraphcase')).to.be(output)
    expect(Localization.toCase(input, Localization.PARAGRAPHCASE)).to.be(output)
    done()
  })

  it('should have a shorthand in a class instance', (done) => {
    const l10n = new Localization()
    expect(l10n.toCase).to.be(Localization.toCase)
    done()
  })
})
