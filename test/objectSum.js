const { expect } = require('chai')
const { objectSum } = require('../')

describe('lib/helpers/objectSum', () => {
  it('should sum two objects', () => {
    expect(objectSum([{ foo: 1, bar: 2 }, { foo: 1 }, { bar: 2 }])).to.eql({ foo: 2, bar: 4 })
  })

  it('should sum only numbers', () => {
    expect(() => objectSum([{ foo: 'bar' }, { foo: 1 }])).to.throw(TypeError)
  })

  it('should traverse nested objects', () => {
    expect(objectSum([{ foo: { bar: 1 } }, { foo: { bar: 2 } }, { bar: 2 }])).to.eql({ foo: { bar: 3 }, bar: 2 })
  })

  it('should throw an InvalidArgument when trying to sum object and scalar', () => {
    expect(() => objectSum({ foo: 1 }, { foo: { bar: 2 } })).to.throw(TypeError)
    expect(() => objectSum({ foo: { bar: 2 } }, { foo: 1 })).to.throw(TypeError)
  })
})
