const { expect } = require('chai')
const { getValue } = require('../')

describe('lib/getValue', () => {
  it('should get shallow value', () => {
    const source = {
      foo: 'bar'
    }
    expect(getValue(source, 'foo')).to.eql(source.foo)
  })

  it('should get shallow value', () => {
    const targetValue = 'target-value'
    const source = {
      foo: {
        bar: targetValue
      }
    }
    expect(getValue(source, 'foo.bar')).to.eql(targetValue)
  })

  it('should get default value if value is not found', () => {
    const source = {
      foo: 'bar'
    }
    const defaultValue = 'foo'

    expect(getValue(source, 'bar', defaultValue)).to.eql(defaultValue)
  })

  it('should get default value if value is null in a tree', () => {
    const source = {
      foo: {
        bar: {
          isNull: null
        }
      }
    }
    const defaultValue = 'foo'

    expect(getValue(source, 'foo.undefined.bar', defaultValue)).to.eql(defaultValue)
  })

  it('should return falseish values as they are', () => {
    const source = {
      false: false,
      emptyString: '',
      zero: 0
    }

    expect(getValue(source, 'false')).to.eql(false)
    expect(getValue(source, 'emptyString')).to.eql('')
    expect(getValue(source, 'zero')).to.eql(0)
  })

  it('should pass by reference the values', () => {
    const targetValue = 'target-value'
    const targetArray = ['foo', 'bar']

    const source = {
      foo: {
        bar: targetValue
      },
      arr: targetArray
    }

    expect(getValue(source, 'foo')).to.equal(source.foo)
    expect(getValue(source, 'arr')).to.equal(targetArray)
  })

  it('should chain and get the first available value for an array', () => {
    const source = {
      target1: {
        match: true
      },
      target2: {
        null: null
      },
      target3: {
        undefined: undefined
      }
    }

    const paths = [
      'target3.undefined',
      'target2.null',
      'target1.match'
    ]

    expect(getValue(source, paths)).to.equal(true)
  })

  it('should return the default value for an array if no key was found', () => {
    const source = {
      target1: {
        match: true
      },
      target2: {
        null: null
      },
      target3: {
        undefined: undefined
      }
    }

    const paths = [
      'target3.undefined',
      'target2.null'
    ]

    expect(getValue(source, paths, source.target1)).to.equal(source.target1)
  })
})
