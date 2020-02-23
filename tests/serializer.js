const expect = require('expect.js')
const serializer = require('../lib/serializer')

describe('serializer', () => {
  it('should return a promise', (done) => {
    expect(serializer([])).to.be.a(Promise)
    done()
  })

  it('should resolve the promises in chain and return all the resolved values as an array', (done) => {
    const data = [0, 1, 2, 3]

    serializer(data, (item, i) => {
      if (item !== data[i]) {
        return Promise.reject(new Error('Did not loop in chain'))
      }

      return Promise.resolve(item)
    })
      .then((response) => {
        expect(response).to.eql(data)
        done()
      })
      .catch(done)
  })

  it('should stop the serializer chain when callback rejects', (done) => {
    const data = [0, 1, 2, 3]
    let counter = 0

    serializer(data, (item, i) => {
      if (i === 2) {
        return Promise.reject(new Error('Rejecting on purpose'))
      }

      counter++
    })
      .then(() => {
        done(new Error('Should have rejected the chain'))
      })
      .catch((err) => {
        if (counter !== 2) {
          err.message = 'Counter mismatch'
          return done(err)
        }

        done()
      })
  })
})
