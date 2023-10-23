const { expect } = require('chai')
const { Dataset } = require('../')
const { InvalidArgument } = require('@vapaaradikaali/errors')

describe('lib/dataset', () => {
  it('should extend Set', () => {
    const d = new Dataset()
    expect(d).to.be.an.instanceof(Set)
  })

  it('should have a method toArray', () => {
    const testData = [1, 2]
    const d = new Dataset(testData)
    expect(d).not.to.eql(testData)
    expect(d.toArray()).to.eql(testData)
  })

  it('should have a method map', () => {
    const testData = [1, 2]
    const d = new Dataset(testData)
    expect(d.map).to.be.a('function')
    expect(d.map(r => r)).to.eql(new Dataset(testData))
    expect(d.map(r => r).toArray()).to.eql(testData)
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

  it('should clear the dataset', () => {
    const values = [1, 2, 3]
    const d = new Dataset(values)
    d.clear()
    expect(Array.from(d)).to.eql([])
  })

  it('should clear the dataset with indices', () => {
    const values = [{ id: 1 }, { id: 2 }]
    const d = new Dataset(values, { indices: ['id'] })

    expect(d.size).to.equal(2)
    expect(Array.from(d.$.indices.id.keys()).length).to.equal(2)

    d.clear()

    expect(d.size).to.equal(0)
    expect(Array.from(d.$.indices.id.keys()).length).to.equal(0)
  })

  it('should have alias "truncate" for clear', () => {
    const d = new Dataset()
    expect(d.truncate).to.equal(d.clear)
  })

  it('should add to mapped values', () => {
    const testValue = { id: 1 }
    const d = new Dataset(null, { id: 'id' })

    expect(d.$.mapped.get(1)).to.eql(undefined)

    d.addToMap(testValue)
    expect(d.$.mapped.get(1)).to.eql(testValue)
  })

  it('should add to indices', () => {
    const testValue = { id: 1, indexValue: 2 }
    const d = new Dataset([testValue], { id: 'id', indices: 'indexValue' })

    expect(d.$.indices.id.get(1)).to.equal(testValue)
    expect(d.$.indices.indexValue.get(2)).to.equal(testValue)
  })

  it('should have alias "addToIndex" for "addToIndices"', () => {
    const d = new Dataset()
    expect(d.addToIndex).to.equal(d.addToIndices)
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

  it('should use indices for getByIndex', () => {
    const testValue = { id: 1, indexValue: 2 }
    const d = new Dataset([testValue], { id: 'id', indices: 'indexValue' })

    expect(d.getByIndex('indexValue', 1)).to.equal(undefined)
    expect(d.getByIndex('undefinedIndex', 1)).to.equal(undefined)
    expect(d.getByIndex('indexValue', 2)).to.equal(testValue)
  })

  it('should get by property', () => {
    const testData = [
      {
        id: 1,
        parent: null
      },
      {
        id: 2,
        parent: null
      },
      {
        id: 11,
        parent: 1
      },
      {
        id: 12,
        parent: 1
      },
      {
        id: 21,
        parent: 2
      }
    ]

    const d = new Dataset(testData, { id: 'id' })

    expect(Array.from(d.getByProperty('parent', 1))).to.eql([testData[2], testData[3]])
    expect(Array.from(d.getByProperty('parent', 2))).to.eql([testData[4]])
  })

  it('should get by property recursively', () => {
    const testData = [
      {
        id: 1,
        parent: null
      },
      {
        id: 2,
        parent: null
      },
      {
        id: 11,
        parent: 1
      },
      {
        id: 12,
        parent: 1
      },
      {
        id: 112,
        parent: 11
      },
      {
        id: 21,
        parent: 2
      }
    ]

    const d = new Dataset(testData, { id: 'id' })

    expect(Array.from(d.getByProperty('parent', 1, 'id'))).to.eql([testData[2], testData[4], testData[3]])
  })

  it('should get by property with values as an array', () => {
    const testData = [
      {
        id: 1,
        parent: null
      },
      {
        id: 2,
        parent: null
      },
      {
        id: 11,
        parent: 1
      },
      {
        id: 12,
        parent: 1
      },
      {
        id: 112,
        parent: 11
      },
      {
        id: 21,
        parent: 2
      }
    ]

    const d = new Dataset(testData, { id: 'id' })

    expect(Array.from(d.getByProperty('parent', [1, 2]))).to.eql([testData[2], testData[3], testData[5]])
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

  it('should have an alias "length" for "size"', () => {
    const d = new Dataset()

    expect(d.length).to.equal(0)
    d.add('foo')
    expect(d.length).to.equal(1)
    expect(d.length).to.equal(d.size)
  })

  it('should have aliases "includes" and "contains" for "has"', () => {
    const d = new Dataset()
    expect(d.includes).to.equal(d.has)
    expect(d.contains).to.equal(d.has)
  })

  it('should sort a dataset', () => {
    const source = new Dataset([3, 2, 1])
    const sorted = source.sort((a, b) => a > b ? -1 : 1)

    expect(sorted).not.to.equal(source)
    expect(sorted).to.eql(new Dataset([1, 2, 3]))

    // Reverse: values are in the same order, but instance is new
    const rev = source.sort((a, b) => a > b ? 1 : -1)
    expect(rev).not.to.equal(source)
    expect(rev).to.eql(source)
  })

  it('should reverse a dataset', () => {
    const source = new Dataset([3, 2, 1])
    const reversed = source.reverse()

    expect(source).to.eql(new Dataset([3, 2, 1]))
    expect(reversed).to.eql(new Dataset([1, 2, 3]))
  })

  it('should find from a dataset', () => {
    const data = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 1 }
    ]

    const source = new Dataset(data)
    expect(source.find((item) => item.id === 1)).to.equal(data[0])
    expect(source.findLast((item) => item.id === 1)).to.equal(data[3])
  })

  it('should have toJSON method', () => {
    const testData = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]

    const d = new Dataset(testData)
    expect(d.toJSON()).to.eql(testData)
  })

  it('should copy a dataset', () => {
    const testData = ['foo', 'bar']
    const d1 = new Dataset(testData)
    const d2 = d1.copy()

    expect(d1).not.to.equal(d2)
    expect(d1.toJSON()).to.eql(d2.toJSON())
  })

  it('should merge datasets', () => {
    const testData1 = ['foo', 'bar']
    const testData2 = ['bar', 'foobar']

    const d1 = new Dataset(testData1)
    const d2 = new Dataset(testData2)
    const d3 = d1.merge(d2)

    expect(d1).not.to.equal(d2)
    expect(d2).not.to.equal(d3)

    expect(d1).to.equal(d3)
    expect(d3.toJSON()).to.eql(['foo', 'bar', 'foobar'])
  })

  it('should have an alias concat for merge', () => {
    const d1 = new Dataset()
    expect(d1.merge).to.equal(d1.concat)
  })

  it('should have a method splitIntoChunks', () => {
    const testData = new Dataset([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

    expect(() => testData.splitIntoChunks()).to.throw(InvalidArgument)
    expect(() => testData.splitIntoChunks(0)).to.throw(InvalidArgument)
    expect(() => testData.splitIntoChunks('a')).to.throw(InvalidArgument)

    expect(testData.splitIntoChunks(2)).to.eql([
      new Dataset([1, 2, 3, 4, 5, 6]),
      new Dataset([7, 8, 9, 10, 11, 12])
    ])

    expect(testData.splitIntoChunks(3)).to.eql([
      new Dataset([1, 2, 3, 4]),
      new Dataset([5, 6, 7, 8]),
      new Dataset([9, 10, 11, 12])
    ])

    expect(testData.splitIntoChunks(4)).to.eql([
      new Dataset([1, 2, 3]),
      new Dataset([4, 5, 6]),
      new Dataset([7, 8, 9]),
      new Dataset([10, 11, 12])
    ])

    // Omit empty
    expect(testData.splitIntoChunks(5)).to.eql([
      new Dataset([1, 2, 3]),
      new Dataset([4, 5, 6]),
      new Dataset([7, 8, 9]),
      new Dataset([10, 11, 12])
    ])

    expect(testData.splitIntoChunks(6)).to.eql([
      new Dataset([1, 2]),
      new Dataset([3, 4]),
      new Dataset([5, 6]),
      new Dataset([7, 8]),
      new Dataset([9, 10]),
      new Dataset([11, 12])
    ])
  })
})
