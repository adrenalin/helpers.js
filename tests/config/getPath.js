const expect = require('expect.js')
const Config = require('../../lib/Config')

describe('config:getPath', () => {
  it('should return an empty path with no arguments', (done) => {
    expect(Config.getPath()).to.eql([])
    expect(Config.getPath(null)).to.eql([])
    expect(Config.getPath(undefined)).to.eql([])
    done()
  })

  it('should return a string as an array', (done) => {
    expect(Config.getPath('foo')).to.eql(['foo'])
    expect(Config.getPath('foo.bar')).to.eql(['foo', 'bar'])
    done()
  })

  it('should throw an error when using invalid key', (done) => {
    expect(Config.getPath).withArgs([['deep-path']]).to.throwError()
    done()
  })
})
