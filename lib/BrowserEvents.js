/**
 * Browser events class
 *
 * @class BrowserEvents
 */

const listeners = {}

module.exports = class BrowserEvents {
  /**
   * Register an event listener
   *
   * @method BrowserEvents#on
   * @param { string } eventName      Event name
   * @param { function } callback     Event listener
   */
  on (eventName, callback) {
    listeners[eventName] = listeners[eventName] || []
    listeners[eventName].push(callback)
  }

  /**
   * Unregister event listeners, optionally only the given
   *
   * @method BrowserEvents#off
   * @param { string } eventName      Event name
   * @param { function } [callback]   Event listener
   */
  off (eventName, listener) {
    const handlers = listeners[eventName] || []

    if (!listener) {
      delete listeners[eventName]
      return
    }

    const index = handlers.indexOf(listener)

    /* istanbul disable next */
    if (index > -1) {
      handlers.splice(index, 1)
    }
  }

  /**
   * Trigger an event
   *
   * @method BrowserEvents#trigger
   * @param { string } eventName      Event name
   * @param { mixed } ...args         Event arguments
   */
  trigger (eventName, ...args) {
    const handlers = listeners[eventName] || []

    handlers.forEach((listener) => {
      try {
        listener(...args)
      } catch (err) {
        console.error(err)
      }
    })
  }
}
