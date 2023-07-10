const { expect } = require('chai')
const { sleep } = require('../')

describe('lib/sleep', () => {
  it('should sleep for the given time', async () => {
    const start = Date.now()
    const duration = 100

    await sleep(duration)
    expect(start + duration <= Date.now()).to.equal(true)
  })
})
