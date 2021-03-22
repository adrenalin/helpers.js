const expect = require('expect.js')
const trim = require('../lib/trim')

describe('lib/trim', () => {
  it('should trim heading space', (done) => {
    expect(trim(' \t\n\rfoo')).to.be('foo')
    done()
  })

  it('should trim trailing space', (done) => {
    expect(trim('bar \t\n\r')).to.be('bar')
    done()
  })

  it('should trim space from both ends', (done) => {
    expect(trim(' \t\n\rbar \t\n\r')).to.be('bar')
    done()
  })

  it('should not trim internal spaces', (done) => {
    expect(trim('bar \t\n\rfoo')).to.be('bar \t\n\rfoo')
    done()
  })

  it('should accept only one argument', (done) => {
    expect(trim).withArgs('foo', 'bar').to.throwException()
    done()
  })

  it('should accept only a string argument', (done) => {
    expect(trim).withArgs(['foo', 'bar']).to.throwException()
    expect(trim).withArgs({ foo: 'bar' }).to.throwException()
    expect(trim).withArgs(1).to.throwException()
    done()
  })
})
