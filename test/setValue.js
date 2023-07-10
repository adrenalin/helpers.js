const { expect } = require('chai')
const { setValue } = require('../')

describe('lib/setValue', () => {
  it('should set a shallow value', () => {
    const target = {}
    const value = setValue(target, 'foo', 'bar')

    expect(target.foo).to.equal('bar')
    expect(value).to.equal(target)
  })

  it('should set a deep value', () => {
    const target = {}
    const value = setValue(target, 'foo.bar', 'bar')

    expect(target.foo.bar).to.equal('bar')
    expect(value).to.equal(target)
  })

  it('should set a deep value to an existing sub object', () => {
    const target = {
      foo: {
        bar: 'foo'
      }
    }
    const value = setValue(target, 'foo.bar', 'bar')

    expect(target.foo.bar).to.equal('bar')
    expect(value).to.equal(target)
  })
})
