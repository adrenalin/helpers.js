const { expect } = require('chai')
const { expandObject } = require('../')

describe('lib/expandObject', () => {
  it('should return non-objects as they were', (done) => {
    expect(expandObject(null)).to.eql(null)
    expect(expandObject(undefined)).to.eql(undefined)
    expect(expandObject(1.23)).to.eql(1.23)
    expect(expandObject('foo')).to.eql('foo')
    expect(expandObject(['foo', 'bar'])).to.eql(['foo', 'bar'])
    done()
  })

  it('should expand an object', (done) => {
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
    done()
  })
})
