const { expect } = require('chai')
const { Dataset } = require('../')

describe('lib/dataset', () => {
  it('should extend Set', () => {
    const d = new Dataset()
    expect(d).to.be.an.instanceof(Set)
  })

  it('should have a method map', () => {
    const testData = [1, 2]
    const d = new Dataset(testData)
    expect(d.map).to.be.a('function')
    expect(d.map(r => r)).to.eql(testData)
  })

  it('should have a method filter that returns a new Dataset', () => {
    const testData = [1, 2, 3]
    const d = new Dataset(testData)

    expect(d.filter(v => v > 2)).to.eql(new Dataset([3]))
  })

  it('should filter with an object with any and all flags', () => {
    const testData = [
      { a: 1, b: 2 },
      { a: 2, b: 2 },
      { a: 3, b: 3 }
    ]
    const d = new Dataset(testData)

    expect(d.filter({ a: 2, b: 2 })).to.eql(new Dataset([testData[1]]))
    expect(d.filter({ a: 2, b: 2 }, true)).to.eql(new Dataset([testData[0], testData[1]]))
  })

  it('should have a method reduce that reduces the dataset', () => {
    const testData = [1, 2, 3]
    const d = new Dataset(testData)
    expect(d.reduce((total, current) => total + current, 1)).to.equal(7)
  })

  it('should add multiple values at once', () => {
    const values = [1, 2, 3]
    const d = new Dataset()
    d.add(...values)
    expect(Array.from(d)).to.eql(values)
  })

  it('should push a value', () => {
    const values = [1, 2, 3]
    const d = new Dataset()

    values.forEach((v) => {
      d.push(v)
    })

    expect(Array.from(d)).to.eql(values)
  })

  it('should delete multiple values at once', () => {
    const values = [1, 2, 3]
    const d = new Dataset(values)
    d.delete(...values)
    expect(Array.from(d)).to.eql([])
  })

  it('should add to mapped values', () => {
    const testValue = { id: 1 }
    const d = new Dataset(null, { id: 'id' })
    expect(d.$.mapped[1]).to.eql(undefined)

    d.addToMap(testValue)
    expect(d.$.mapped[1]).to.eql(testValue)
  })

  it('should use options for getById', () => {
    const testData = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]

    const d = new Dataset(testData, { id: 'id' })
    expect(d.getById(2)).to.equal(testData[1])
    expect(d.getById(0)).to.equal(undefined)
  })

  it('should find an object by id property after it has been added', () => {
    const testData = { id: 1 }

    const d = new Dataset(null, { id: 'id' })
    expect(d.getById(1)).to.equal(undefined)

    d.add(testData)
    expect(d.getById(1)).to.equal(testData)
  })

  it('should not find an object by id property after it has been deleted', () => {
    const testData = { id: 1 }

    const d = new Dataset([testData], { id: 'id' })
    expect(d.getById(1)).to.equal(testData)

    d.delete(testData)
    expect(d.getById(1)).to.equal(undefined)
    expect(d.size).to.equal(0)
  })

  it('should have an alias length for size', () => {
    const d = new Dataset()

    expect(d.length).to.equal(0)
    d.add('foo')
    expect(d.length).to.equal(1)
  })
})
