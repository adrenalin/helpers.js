const { expect } = require('chai')
const { Datamap } = require('../')
const { InvalidArgument } = require('@vapaaradikaali/errors')

describe('lib/datamap', () => {
  it('should set and get a value', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    expect(map.get('foo')).to.equal('bar')
  })

  it('should accept key-value pairs in the constructor', () => {
    const values = {
      foo: 'bar',
      bar: 'foo'
    }

    const map = new Datamap(values)
    expect(map.get('foo')).to.equal(values.foo)
    expect(map.get('bar')).to.equal(values.bar)
  })

  it('should accept only objects in the constructor', () => {
    expect(() => new Datamap(1)).to.throw(InvalidArgument)
    expect(() => new Datamap('1')).to.throw(InvalidArgument)
    expect(() => new Datamap([])).to.throw(InvalidArgument)

    expect(() => new Datamap({})).not.to.throw(InvalidArgument)
    expect(() => new Datamap({}, {})).not.to.throw(InvalidArgument)
  })

  it('should return true if datamap has a key, false if not', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    expect(map.has('foo')).to.eql(true)
    expect(map.has('bar')).to.eql(false)
  })

  it('should return datamap keys and values', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    map.set('bar', 'foo')

    expect(map.keys()).to.eql(['foo', 'bar'])
    expect(map.values()).to.eql(['bar', 'foo'])
  })

  it('should clear datamap keys', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    expect(map.has('foo')).to.eql(true)

    map.clear()
    expect(map.has('foo')).to.eql(false)
  })

  it('should delete a value', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    expect(map.has('foo')).to.eql(true)

    map.delete('foo')
    expect(map.has('foo')).to.eql(false)
  })

  it('should have a forEach', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    map.forEach((value, key, m) => {
      expect(key).to.equal('foo')
      expect(value).to.equal('bar')
      expect(m).to.equal(map)
    })
  })

  it('should have a map function', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    const values = map.map((value, key, m) => {
      expect(key).to.equal('foo')
      expect(value).to.equal('bar')
      expect(m).to.equal(map)
      return [key, value]
    })

    expect(values).to.eql([['foo', 'bar']])
  })

  it('should have a reduce function', () => {
    const map = new Datamap()
    map.set(1, 1)
    map.set(2, 2)

    const reduced = map.reduce((acc, v) => acc + v, 0)
    expect(reduced).to.eql(3)
  })

  it('should have a filter function', () => {
    const values = {
      foo: {
        description: 'foo passed by reference'
      },
      bar: {
        description: 'bar passed by reference'
      }
    }
    const map = new Datamap(values)

    const filtered = map.filter((value, key, source) => {
      expect(value).to.equal(values[key])
      expect(source).to.equal(map)

      return key === 'foo'
    })

    expect(filtered).to.be.an.instanceof(Datamap)
    expect(filtered.keys()).to.eql(['foo'])
    expect(filtered.get('foo')).to.equal(values.foo)
  })
})
