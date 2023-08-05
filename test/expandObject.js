const { expect } = require('chai')
const { expandObject } = require('../')

describe('lib/expandObject', () => {
  it('should return non-objects as they were', () => {
    expect(expandObject(null)).to.eql(null)
    expect(expandObject(undefined)).to.eql(undefined)
    expect(expandObject(1.23)).to.eql(1.23)
    expect(expandObject('foo')).to.eql('foo')
    expect(expandObject(['foo', 'bar'])).to.eql(['foo', 'bar'])
  })

  it('should expand an object', () => {
    const source = {
      'foo.bar': 'foo',
      'foo.array': ['foo', 'bar'],
      'foo.nested.deep.object': true
    }

    const value = expandObject(source)
    expect(value).to.eql({
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
    })
  })
})
