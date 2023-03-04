const { expect } = require('chai')
const { sleep } = require('../')

describe('lib/sleep', () => {
  it('should sleep for the given time', (done) => {
    const start = Date.now()
    const duration = 100

    sleep(duration)
      .then(() => {
        expect(start + duration <= Date.now()).to.equal(true)
        done()
      })
      .catch(done)
  })
})
