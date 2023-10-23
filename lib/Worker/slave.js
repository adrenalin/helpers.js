const { parentPort } = require('node:worker_threads')

/**
 * Execute worker
 *
 * @private
 * @function executeWorker
 * @param { object } options          Worker options
 * @param { mixed[] } [args]          Worker arguments
 * @return { mixed }                  Response from the worker
 */
function executeWorker (options, args) {
  /* istanbul ignore next worker coverage works badly */
  if (options.callback) {
    const fn = eval(options.callback) // eslint-disable-line no-eval
    return fn(...args)
  }

  /* istanbul ignore next worker coverage works badly */
  if (!options.path) {
    throw new Error('No path given for execute')
  }

  const fn = require(options.path)
  return options.method ? fn[options.method](...args) : fn(...args)
}

parentPort.on('message', async ({ args, id, options }) => {
  try {
    const response = await executeWorker(options, args)
    parentPort.postMessage({ id, response, options })
  } catch (err) {
    /* istanbul ignore next worker coverage works badly */
    parentPort.postMessage({ id, err, options })
  } finally {
    if (options.terminate) {
      setTimeout(() => {
        process.exit()
      }, 500)
    }
  }
})
