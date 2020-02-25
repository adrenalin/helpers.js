/**
 * Remove elements from array
 *
 * @param { array } source            Source array
 * @param { mixed } ...items          Items to be removed
 * @return { array }                  Array with elements removed
 */
module.exports = function removeFromArray (source, ...items) {
  if (!Array.isArray(source)) {
    throw new Error('First argument has to be an array')
  }

  return source
    .filter((item) => {
      return !items.includes(item)
    })
}
