const expect = require('expect.js')
const sleep = require('../lib/sleep')

describe('sleep', () => {
  it('should sleep for the given time', (done) => {
    const start = Date.now()
    const duration = 100

    sleep(duration)
      .then(() => {
        expect(start + duration < Date.now()).to.be(true)
        done()
      })
      .catch(done)
  })
})
