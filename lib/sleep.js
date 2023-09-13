/**
 * Sleep for the given amount of time
 *
 * @function sleep
 * @param { number } duration         Sleep time in milliseconds
 */
module.exports = function sleep (duration) {
  return new Promise((resolve, reject) => {
    setTimeout(function sleep () {
      resolve()
    }, duration)
  })
}
