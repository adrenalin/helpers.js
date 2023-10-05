const { expect } = require('chai')
const { getObjectPaths } = require('../')

describe('lib/getObjectPaths', () => {
  it('should return object paths for a flat object', () => {
    expect(getObjectPaths({ foo: 'bar', bar: 'foo' })).to.eql(['foo', 'bar'])
  })

  it('should return paths of a deep object', () => {
    expect(getObjectPaths({ foo: { bar: 'foobar' } })).to.eql(['foo', 'foo.bar'])
  })

  it('should return array with indexes', () => {
    expect(getObjectPaths({ foo: ['foo', { bar: 'foobar' }] })).to.eql([
      'foo',
      'foo.0',
      'foo.1',
      'foo.1.bar'
    ])
  })
})
