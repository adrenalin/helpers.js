const expect = require('expect.js')
const getPath = require('../lib/getPath')

describe('config:getPath', () => {
  it('should return an empty path with no arguments', (done) => {
    expect(getPath()).to.eql([])
    expect(getPath(null)).to.eql([])
    expect(getPath(undefined)).to.eql([])
    done()
  })

  it('should return a string as an array', (done) => {
    expect(getPath('foo')).to.eql(['foo'])
    expect(getPath('foo.bar')).to.eql(['foo', 'bar'])
    done()
  })

  it('should throw an error when using invalid key', (done) => {
    expect(getPath).withArgs([['deep-path']]).to.throwError()
    done()
  })
})
