const { expect } = require('chai')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const { getMappedItems } = require('../')

describe('lib/getMappedItems', () => {
  it('should throw an InvalidArgument error when not providing an array or a Set', () => {
    expect(() => getMappedItems('foo', 'foo')).to.throw(InvalidArgument)
    expect(() => getMappedItems(null, 'foo')).to.throw(InvalidArgument)
    expect(() => getMappedItems(1, 'foo')).to.throw(InvalidArgument)
    expect(() => getMappedItems({ foo: 'bar' }, 'foo')).to.throw(InvalidArgument)

    expect(() => getMappedItems(['foo'], 'foo')).not.to.throw(InvalidArgument)
    expect(() => getMappedItems(new Set(['foo']), 'foo')).not.to.throw(InvalidArgument)
  })

  it('should throw an InvalidArgument if the second argument is not a string or an array of strings', () => {
    const set = [
      {
        id: 'foo'
      }
    ]

    expect(() => getMappedItems(['foo'], null)).to.throw(InvalidArgument)
    expect(() => getMappedItems(['foo'], 1)).to.throw(InvalidArgument)
    expect(() => getMappedItems(['foo'], [])).to.throw(InvalidArgument)
    expect(() => getMappedItems(['foo'], ['id', 1])).to.throw(InvalidArgument)
    expect(() => getMappedItems(['foo'], ['id', 'bar'])).not.to.throw(InvalidArgument)
  })

  it('should return items mapped by id', () => {
    const items = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ]

    const mapped = getMappedItems(items, 'id')
    expect(mapped[1]).to.eql(items[0])
    expect(mapped[2]).to.eql(items[1])
    expect(mapped[3]).to.eql(items[2])
  })

  it('should throw an InvalidArgument error when there are duplicates', () => {
    const items = [
      {
        id: 'foo'
      },
      {
        id: 'foo'
      }
    ]

    expect(() => getMappedItems(items, 'id')).to.throw(InvalidArgument)
  })
})
