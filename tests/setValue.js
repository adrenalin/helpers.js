const expect = require('expect.js')
const setValue = require('../lib/setValue')

describe('setValue', () => {
  it('should set a shallow value', (done) => {
    const target = {}
    const value = setValue(target, 'foo', 'bar')

    expect(target.foo).to.be('bar')
    expect(value).to.be(target)
    done()
  })

  it('should set a deep value', (done) => {
    const target = {}
    const value = setValue(target, 'foo.bar', 'bar')

    expect(target.foo.bar).to.be('bar')
    expect(value).to.be(target)
    done()
  })

  it('should set a deep value to an existing sub object', (done) => {
    const target = {
      foo: {
        bar: 'foo'
      }
    }
    const value = setValue(target, 'foo.bar', 'bar')

    expect(target.foo.bar).to.be('bar')
    expect(value).to.be(target)
    done()
  })
})
