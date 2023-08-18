const { expect } = require('chai')
const { getPath } = require('../')

describe('lib/getPath', () => {
  it('should return an empty path with no arguments', () => {
    expect(getPath()).to.eql([])
    expect(getPath(null)).to.eql([])
    expect(getPath(undefined)).to.eql([])
  })

  it('should return a string as an array', () => {
    expect(getPath('foo')).to.eql(['foo'])
    expect(getPath('foo.bar')).to.eql(['foo', 'bar'])
  })

  it('should throw an error when using invalid key', () => {
    expect(() => getPath([['deep-path']])).to.throw()
  })
})
