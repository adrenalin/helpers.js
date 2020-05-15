/**
 * Sleep for the given amount of time
 *
 * @param { number } duration         Sleep time in milliseconds
 */
module.exports = function sleep (duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}
