const { expect } = require('chai')
const { flattenObject } = require('../')

describe('lib/flattenObject', () => {
  it('should return non-objects as they were', () => {
    expect(flattenObject(null)).to.eql(null)
    expect(flattenObject(undefined)).to.eql(undefined)
    expect(flattenObject(1.23)).to.eql(1.23)
    expect(flattenObject('foo')).to.eql('foo')
    expect(flattenObject(['foo', 'bar'])).to.eql(['foo', 'bar'])
  })

  it('should flatten a deep object', () => {
    const source = {
      foo: {
        bar: 'foo',
        array: [
          'foo',
          'bar'
        ],
        nested: {
          deep: {
            object: true
          }
        }
      }
    }

    const value = flattenObject(source)
    expect(value['foo.bar']).to.eql(source.foo.bar)
    expect(value['foo.array']).to.eql(source.foo.array)
    expect(value['foo.nested.deep.object']).to.eql(true)
  })
})
