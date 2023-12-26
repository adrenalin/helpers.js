const { expect } = require('chai')
const { Datamap } = require('../')
const { InvalidArgument } = require('@vapaaradikaali/errors')

describe('lib/datamap', () => {
  it('should set and get a value', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    expect(map.get('foo')).to.equal('bar')
  })

  it('should keep the last set value', () => {
    const map = new Datamap()
    map.set('foo', 'bar')
    map.set('foo', 'foo')
    expect(map.get('foo')).to.equal('foo')
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

  it('should provide an iterable', () => {
    const values = {
      foo: 'bar',
      bar: 'foo'
    }

    const map = new Datamap(values)

    for (const key of map) {
      expect(values).to.have.property(key)
    }
  })

  it('should provide datamap length and size', () => {
    const values = {
      foo: 'bar',
      bar: 'foo'
    }

    const map = new Datamap(values)

    expect(map.length).to.eql(2)
    expect(map.size).to.eql(2)
  })

  it('should provide slice for cutting the datamap', () => {
    const values = {
      foo: 'bar',
      bar: 'foo',
      foobar: 'foobar'
    }

    const map = new Datamap(values)

    const d0 = map.slice()
    expect(d0.length).to.eql(map.length)
    expect(d0.values()).to.eql(map.values())
    expect(d0).not.to.equal(map)

    const d1 = map.slice(0, 1)
    expect(d1.length).to.equal(1)
    expect(d1.values()).to.eql([values.foo])
    expect(d1).not.to.equal(map)

    const d2 = map.slice(1)
    expect(d2.length).to.equal(2)
    expect(d2.values()).to.eql([values.bar, values.foobar])
    expect(d2).not.to.equal(map)

    // Original did not change
    expect(map.length).to.equal(3)
  })

  it('should provide methods copy and clone', () => {
    const values = {
      foo: 'bar',
      bar: 'foo',
      foobar: 'foobar'
    }

    const map = new Datamap(values)
    const copy = map.copy()

    expect(map.values()).to.eql(copy.values())
    expect(map).not.to.equal(copy)

    expect(map.copy).to.equal(map.clone)
  })

  it('should set auto-index properties', () => {
    const testObject = {
      foo: 'bar'
    }

    const map = new Datamap()

    // No index set
    expect(() => map.add(testObject)).to.throw(InvalidArgument)

    map.setIndex('foo')

    // No index property defined
    expect(() => map.add({ bar: 'foo' })).to.throw(InvalidArgument)

    map.add(testObject)

    expect(map.get('bar')).to.equal(testObject)
  })

  it('should accept a configuration object as an argument', () => {
    const index = 'test-index-property'
    const indexValue = 'test-index-value'
    const value = {
      [index]: indexValue
    }

    const options = new Datamap.Options({ index })
    const datamap = new Datamap(options)
    expect(datamap.$options.index).to.equal(index)

    datamap.add(value)
    expect(datamap.get(indexValue)).to.equal(value)
  })
})
