const { expect } = require('chai')
const merge = require('../lib/merge')

describe('lib/merge', () => {
  it('should be a function', (done) => {
    expect(merge).to.be.a('function')
    done()
  })

  it('should raise an exception with less than two arguments', () => {
    expect(() => merge({})).to.throw()
  })

  it('should raise an exception with non-object arguments', (done) => {
    expect(() => merge('foo', 'bar')).to.throw()
    done()
  })

  it('should merge three shallow objects', (done) => {
    const o1 = {
      key1: 'value1'
    }

    const o2 = {
      key2: 'value2'
    }

    const o3 = {
      key3: 'value3'
    }

    const merged = merge(o1, o2, o3)
    expect(merged.key1).to.equal(o1.key1)
    expect(merged.key2).to.equal(o2.key2)
    expect(merged.key3).to.equal(o3.key3)
    done()
  })

  it('should merge with deep copy', (done) => {
    const o1 = {
      key1: 'value1',
      key2: {
        subkey1: 'subvalue1'
      }
    }

    const o2 = {
      key2: {
        subkey2: 'subvalue2'
      },
      key3: [
        'foo',
        'bar'
      ]
    }

    const merged = merge(o1, o2)
    expect(merged.key1).to.equal(o1.key1)
    expect(merged.key2).to.eql({ subkey1: o1.key2.subkey1, subkey2: o2.key2.subkey2 })
    expect(merged.key3).to.eql(o2.key3)

    done()
  })

  it('should merge with deep copy overriding non-object', (done) => {
    const o1 = {
      key1: 'value1',
      key2: 'value2'
    }

    const o2 = {
      key2: {
        subkey2: 'subvalue2'
      }
    }

    const merged = merge(o1, o2)
    expect(merged.key1).to.equal(o1.key1)
    expect(merged.key2).to.eql({ subkey2: o2.key2.subkey2 })

    done()
  })

  it('should throw an exception when trying to merge objects and arrays', (done) => {
    expect(() => merge([], {})).to.throw()
    done()
  })

  it('should merge two arrays', (done) => {
    const a1 = [
      'value1',
      'value2'
    ]

    const a2 = [
      'value3',
      'value4'
    ]

    const a3 = [
      'value5',
      'value6'
    ]

    const merged = merge(a1, a2, a3)
    expect(merged).to.contain('value1')
    expect(merged).to.contain('value2')
    expect(merged).to.contain('value3')
    expect(merged).to.contain('value4')
    expect(merged).to.contain('value5')
    expect(merged).to.contain('value6')
    done()
  })

  it('should merge two arrays, skipping duplicates', (done) => {
    const a1 = [
      'value1',
      'value2'
    ]

    const a2 = [
      'value1',
      'value3'
    ]

    const a3 = [
      'value2',
      'value4'
    ]

    const merged = merge(a1, a2, a3)
    expect(merged.length).to.equal(4)
    expect(merged).to.contain('value1')
    expect(merged).to.contain('value2')
    expect(merged).to.contain('value3')
    expect(merged).to.contain('value4')
    done()
  })
})
