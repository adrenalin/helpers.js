const expect = require('expect.js')
const getValue = require('../getValue')

describe('getValue', () => {
  it('should get shallow value', (done) => {
    const source = {
      foo: 'bar'
    }
    expect(getValue(source, 'foo')).to.eql(source.foo)
    done()
  })

  it('should get shallow value', (done) => {
    const targetValue = 'target-value'
    const source = {
      foo: {
        bar: targetValue
      }
    }
    expect(getValue(source, 'foo.bar')).to.eql(targetValue)
    done()
  })

  it('should get default value if value is not found', (done) => {
    const source = {
      foo: 'bar'
    }
    const defaultValue = 'foo'

    expect(getValue(source, 'bar', defaultValue)).to.eql(defaultValue)
    done()
  })

  it('should return falseish values as they are', (done) => {
    const source = {
      false: false,
      emptyString: '',
      zero: 0
    }

    expect(getValue(source, 'false')).to.eql(false)
    expect(getValue(source, 'emptyString')).to.eql('')
    expect(getValue(source, 'zero')).to.eql(0)
    done()
  })

  it('should pass by reference the values', (done) => {
    const targetValue = 'target-value'
    const targetArray = ['foo', 'bar']

    const source = {
      foo: {
        bar: targetValue
      },
      arr: targetArray
    }

    expect(getValue(source, 'foo')).to.be(source.foo)
    expect(getValue(source, 'arr')).to.be(targetArray)
    done()
  })
})
