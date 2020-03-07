const getPath = require('./getPath')
/**
 * Set value in a path to an object
 *
 * @param { object } target           Target object
 * @param { mixed } path              Path as dot separated string or array
 * @param { mixed } value             Value to be set
 */
module.exports = function setValue (target, path, value) {
  path = getPath(path)
  const last = path.pop()

  let tmp = target

  for (let i = 0; i < path.length; i++) {
    const key = path[i]
    tmp = tmp[key] = tmp[key] || {}
  }

  tmp[last] = value

  return target
}
