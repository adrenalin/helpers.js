const { expect } = require('chai')
const { InternalServerError } = require('@vapaaradikaali/errors')
const Worker = require('../../lib/Worker')

const { WorkerError, WorkerUnresolved, WorkerReject } = Worker.errors

describe('lib/Worker', () => {
  it('should expose errors', () => {
    const workerError = new Worker.WorkerError()
    expect(workerError).to.be.an.instanceof(InternalServerError)

    expect(WorkerError).to.equal(Worker.WorkerError)
    expect(WorkerUnresolved).to.equal(Worker.WorkerUnresolved)
    expect(WorkerReject).to.equal(Worker.WorkerReject)
  })

  it('should accept filename as the first argument', async () => {
    const echo = ['test-echo']
    const r1 = await Worker.execute('test/Worker/resources/echo', echo)
    expect(r1).to.eql(echo)

    const w = new Worker()
    const r2 = await w.execute('test/Worker/resources/echo', echo)
    expect(r2).to.eql(echo)
    w.terminate()
  })

  it('should have a method to terminate the worker', () => {
    const w = new Worker()
    const w1 = w.getWorker()
    expect(w.worker).not.to.equal(undefined)
    expect(w.worker).to.equal(w1)
    w.terminate()

    expect(w.worker).to.equal(undefined)

    // Should not choke when trying to terminate for the second time
    w.terminate()
  })

  it('should accept an object with path and method as the first argument', async () => {
    const echo = ['test-echo']

    const r1 = await Worker.execute({ path: 'test/Worker/resources/echo' }, echo, echo)
    expect(r1).to.eql(echo)

    const r2 = await Worker.execute({ path: 'test/Worker/resources/echo', method: 'allArgs' }, echo, echo)
    expect(r2).to.eql([echo, echo])

    const w = new Worker()
    const r3 = await w.execute({ path: 'test/Worker/resources/echo', terminate: true }, echo, echo)
    expect(r3).to.eql(echo)

    const r4 = await w.execute({ path: 'test/Worker/resources/echo', terminate: true, method: 'allArgs' }, echo, echo)
    expect(r4).to.eql([echo, echo])
  })

  it('should accept function as the first argument', async () => {
    const data = ['foo', 'bar']

    const r1 = await Worker.execute((...args) => { return args }, ...data)
    expect(r1).to.eql(data)

    const w = new Worker()
    const r2 = await w.execute((...args) => { return args }, ...data)
    expect(r2).to.eql(data)
    w.terminate()
  })

  it('should throw the received error', async () => {
    try {
      await Worker.execute({
        path: 'test/Worker/resources/echo',
        method: 'error',
        timeout: 1000
      }, true)
      throw new Error('Should have thrown a WorkerRejected')
    } catch (err) {
      expect(err).to.be.an.instanceof(WorkerReject)
      expect(err).to.have.property('originalError')
      expect(err.originalError.message).to.equal('Planned failure')
    }
  })

  it('should reject a worker without a given path', async () => {
    try {
      const w = new Worker()
      await w.execute({ terminate: true }, 'foo', 'bar')
      throw new Error('Should have thrown a WorkerReject')
    } catch (err) {
      expect(err).to.be.an.instanceof(WorkerReject)
    }
  })

  it('should accept a time limit', async () => {
    const response = await Worker.execute({
      path: 'test/Worker/resources/echo',
      method: 'sleep',
      timeout: 1000
    }, true)

    expect(response).to.eql(true)

    try {
      await Worker.execute({
        path: 'test/Worker/resources/echo',
        method: 'sleep',
        timeout: 1
      })
      throw new Error('Should have thrown a WorkerUnresolved')
    } catch (err) {
      expect(err).to.be.an.instanceof(WorkerUnresolved)
    }
  })

  it('should not resolve a rejected process', (done) => {
    const w = new Worker()
    const response = w.execute({
      path: 'test/Worker/resources/echo',
      method: 'sleep',
      timeout: 1000
    }, true)

    for (const k in w.tasks) {
      w.tasks[k].rejected = true
    }

    response
      .then(() => {
        done(new Error('Should not have resolved after failure'))
      })
      .catch((err) => { // eslint-disable-line n/handle-callback-err
        done()
      })
  })
})
