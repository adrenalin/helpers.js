const path = require('path')
const workerThreads = require('node:worker_threads')
const { InternalServerError } = require('@vapaaradikaali/errors')
const getRandomString = require('../getRandomString')
const isObject = require('../isObject')

const NodeWorker = workerThreads.Worker

/**
 * Worker error baseclass
 *
 * @class WorkerError
 */
class WorkerError extends InternalServerError {}

/**
 * Worker error for when the worker does not resolve within the given time
 *
 * @class WorkerError
 */
class WorkerUnresolved extends WorkerError {}

/**
* Worker error for when the worker throws an error
 *
 * @class WorkerError
 */
class WorkerReject extends WorkerError {}

/**
 * Worker
 *
 * @class Worker
 */
module.exports = class Worker {
  constructor () {
    this.tasks = {}
  }

  /**
   * Worker errors
   *
   * @const { object } Worker.errors
   */
  static get errors () {
    return {
      WorkerError,
      WorkerUnresolved,
      WorkerReject
    }
  }

  /**
   * WorkerError error
   *
   * @const { WorkerError } Worker.WorkerError
   */
  static get WorkerError () {
    return WorkerError
  }

  /**
   * WorkerUnresolved error
   *
   * @const { WorkerUnresolved } Worker.WorkerUnresolved
   */
  static get WorkerUnresolved () {
    return WorkerUnresolved
  }

  /**
   * WorkerReject error
   *
   * @const { WorkerReject } Worker.WorkerReject
   */
  static get WorkerReject () {
    return WorkerReject
  }

  /**
   * Execute a single worker
   *
   * @method Worker.execute
   * @param { string|object|function } executor   Worker executor
   * @param  {...any} args Executor arguments
   * @returns mixed
   */
  static execute (executor, ...args) {
    const worker = new Worker()

    if (typeof executor === 'string') {
      executor = {
        path: executor
      }
    }

    if (typeof executor === 'function') {
      executor = {
        callback: executor
      }
    }

    executor.terminate = true
    return worker.execute(executor, ...args)
  }

  /**
   * Get a unique identifier
   *
   * @method Worker#getNewId
   * @returns { string }
   */
  getNewId () {
    let id
    do {
      id = getRandomString(32)
    } while (this.tasks[id])

    return id
  }

  getWorker () {
    this.worker = this.worker || new NodeWorker(path.join(__dirname, 'slave'))
    return this.worker
  }

  /**
   * Execute a single worker
   *
   * @method Worker.execute
   * @param { string|object|function } executor   Worker executor
   * @param  {...any} args Executor arguments
   * @returns mixed
   */
  execute (executor, ...args) {
    const id = this.getNewId()
    const options = {}

    const proc = this.tasks[id] = {
      id,
      rejected: false
    }

    if (typeof executor === 'string') {
      options.path = path.join(process.cwd(), executor)
    }

    if (typeof executor === 'function') {
      options.callback = executor.toString()
    }

    if (isObject(executor)) {
      if (executor.path) {
        options.path = path.join(process.cwd(), executor.path)
      }

      if (executor.method) {
        options.method = executor.method
      }

      if (executor.callback) {
        options.callback = executor.callback.toString()
      }
    }

    this.getWorker().on('message', async (message) => {
      const { err, response, id } = message

      setTimeout(() => {
        delete this.tasks[id]
        this.optionallyTerminateWorker(executor.terminate)
      })

      if (err) {
        const error = new WorkerReject(err.message)
        error.originalError = err
        proc.rejected = true
        return proc.reject(error)
      }

      if (proc.rejected) {
        return
      }

      proc.resolve(response)
    })

    return new Promise((resolve, reject) => {
      proc.resolve = resolve
      proc.reject = reject

      if (executor.timeout) {
        options.terminate = true
        setTimeout(() => {
          this.optionallyTerminateWorker(options.terminate)
          delete this.tasks[id]
          proc.rejected = true
          return reject(new WorkerUnresolved(`Worker failed to resolve within the given time ${executor.timeout} ms`))
        }, executor.timeout)
      }

      this.getWorker().postMessage({ args, options, id })
    })
  }

  /**
   * Optionally terminate worker
   *
   * @method Worker#optionallyTerminateWorker
   * @param {boolean} shouldTerminate Terminate flag
   */
  optionallyTerminateWorker (shouldTerminate) {
    if (shouldTerminate) {
      this.terminate()
    }
  }

  /**
   * Terminate the worker
   *
   * @method Worker#terminate
   */
  terminate () {
    this.getWorker().postMessage({ options: 'terminate' })
    this.worker?.terminate()
    delete this.worker
  }
}
