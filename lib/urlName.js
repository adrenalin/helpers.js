/**
 * Convert a string to URL safe
 *
 * @param { string } input            Input string
 * @return { string }                 URL safe version of the input
 */
module.exports = function urlName (input) {
  if (typeof input !== 'string') {
    throw new Error('urlName expects to receive a string')
  }

  return input
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s\n\r\t]+/g, '_')
    .replace(/[^a-z0-9.-]+/g, '_')
    .replace(/^_/, '')
    .replace(/_$/, '')
}
