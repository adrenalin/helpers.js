const expect = require('expect.js')
const castObjectAsArray = require('../lib/castObjectAsArray')

describe('lib/castObjectAsArray', () => {
  it('should throw an error when casting others than plain objects', (done) => {
    expect(castObjectAsArray).withArgs(1).to.throwError()
    expect(castObjectAsArray).withArgs(true).to.throwError()
    expect(castObjectAsArray).withArgs(null).to.throwError()
    expect(castObjectAsArray).withArgs([]).to.throwError()
    expect(castObjectAsArray).withArgs('null').to.throwError()
    expect(castObjectAsArray).withArgs({}).not.to.throwError()

    done()
  })

  it('should return a flat array', (done) => {
    expect(castObjectAsArray({ 0: 'a', 1: 'b', 2: 'c' })).to.eql(['a', 'b', 'c'])
    expect(castObjectAsArray({ 1: 'a', 2: 'b', 3: 'c' })).to.eql(['a', 'b', 'c'])
    done()
  })

  it('should throw an error with string keys', (done) => {
    expect(castObjectAsArray).withArgs({ foo: 'bar' }).to.throwError()
    done()
  })

  it('should throw an error with intermittent keys', (done) => {
    expect(castObjectAsArray).withArgs({ 0: 'a', 2: 'b' }).to.throwError()
    done()
  })

  it('should throw an error when starting from an integer higher than 1', (done) => {
    expect(castObjectAsArray).withArgs({ 2: 'a', 3: 'b' }).to.throwError()
    done()
  })

  it('should not recurse without the flag', (done) => {
    const obj = {
      0: {
        0: 'foo',
        1: 'bar'
      },
      1: {
        0: 'foo',
        1: 'bar'
      }
    }

    const values = castObjectAsArray(obj)
    expect(values[0]).to.be(obj[0])
    expect(values[1]).to.be(obj[1])
    done()
  })

  it('should recurse with the flag', (done) => {
    const obj = {
      0: {
        0: 'foo',
        1: 'bar'
      },
      1: {
        0: 'foo',
        1: 'bar'
      }
    }

    const values = castObjectAsArray(obj, true)
    expect(values[0]).not.to.be(obj[0])
    expect(values[0]).to.eql(['foo', 'bar'])

    expect(values[1]).not.to.be(obj[1])
    expect(values[1]).to.eql(['foo', 'bar'])
    done()
  })

  it('should recurse with the flag, but keep if cannot recurse', (done) => {
    const obj = {
      0: {
        0: 'foo',
        1: 'bar'
      },
      1: {
        0: 'foo',
        2: 'bar'
      }
    }

    const values = castObjectAsArray(obj, true)
    expect(values[0]).to.eql(['foo', 'bar'])

    expect(values[1]).to.eql(obj[1])
    expect(values[1]).not.to.eql(['foo', 'bar'])
    done()
  })

  it('should recurse children even if parents are not sequential', (done) => {
    const obj = {
      foo: {
        0: 'foo',
        1: 'bar'
      },
      bar: {
        0: 'bar',
        key: {
          0: 'foo',
          1: 'bar'
        }
      }
    }

    const values = castObjectAsArray(obj, true)
    expect(values.foo).not.to.be(obj.foo)
    expect(values.foo).to.eql(['foo', 'bar'])

    expect(values.bar).not.to.be(obj.bar)
    expect(values.bar.key).to.eql(['foo', 'bar'])
    done()
  })

  it('should fail to convert a mixed object', (done) => {
    expect(castObjectAsArray).withArgs({ 0: 'foo', 1: 'bar', foo: 'bar' }).to.throwError()
    done()
  })
})
