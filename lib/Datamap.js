const { InvalidArgument } = require('@vapaaradikaali/errors')
const isObject = require('./isObject')

/**
 * Replacement for Javascript's native Map that is very slow to access data
 * versus a purecode object
 *
 * @class Datamap
 */
module.exports = class Datamap {
  constructor (...values) {
    this.$values = {}

    for (const value of values) {
      if (!isObject(value)) {
        throw new InvalidArgument('Datamap accepts only objects in the constructor')
      }

      for (const k in value) {
        this.$values[k] = value[k]
      }
    }
  }

  /**
   * Check if the datamap has the given key
   *
   * @method Datamap#has
   * @param { mixed } key             Map key
   * @return { boolean }              True if a value exists
   */
  has (key) {
    return this.$values[key] !== undefined
  }

  /**
   * Get the datamap value
   *
   * @method Datamap#get
   * @param { mixed } key             Map key
   * @return { mixed }                Stored value
   */
  get (key) {
    return this.$values[key]
  }

  /**
   * Set the datamap value
   *
   * @method Datamap#set
   * @param { mixed } key             Map key
   * @param { mixed } value           Stored value
   */
  set (key, value) {
    this.$values[key] = value
  }

  /**
   * Get the datamap keys
   *
   * @method Datamap#keys
   * @return { string[] }             Stored keys
   */
  keys () {
    return Object.keys(this.$values)
  }

  /**
   * Get the datamap values
   *
   * @method Datamap#values
   * @return { mixed[] }              Stored values
   */
  values () {
    return Object.values(this.$values)
  }

  /**
   * Clear the datamap
   *
   * @method Datamap#clear
   */
  clear () {
    this.$values = {}
  }

  /**
   * Delete a datamap key
   *
   * @method Datamap#delete
   * @param { mixed } key             Map key
   */
  delete (key) {
    delete this.$values[key]
  }

  /**
   * Iterate a datamap
   *
   * @method Datamap#forEach
   * @param { function } iterator     Iterator callback function
   */
  forEach (iterator) {
    for (const k in this.$values) {
      iterator(this.$values[k], k, this)
    }
  }

  /**
   * Map function for a datamap
   *
   * @method Datamap#map
   * @param { function } iterator     Iterator callback function
   * @return { mixed[] }              Iterator output
   */
  map (iterator) {
    const values = []

    for (const k in this.$values) {
      values.push(iterator(this.$values[k], k, this))
    }

    return values
  }

  /**
   * Reduce function for a datamap
   *
   * @method Datamap#reduce
   * @param { function } iterator     Iterator callback function
   * @param { mixed } initialValue    Initial value
   * @return { mixed }                Iterator output
   */
  reduce (iterator, initialValue) {
    return Object.values(this.$values).reduce(iterator, initialValue)
  }

  /**
   * Filter function for Datamap
   *
   * @method Datamap#filter
   * @param { function } iterator     Iterator callback function
   * @return { Datamap }              Filtered datamap
   */
  filter (iterator) {
    const filtered = new Datamap()

    for (const key in this.$values) {
      if (iterator(this.$values[key], key, this)) {
        filtered.set(key, this.$values[key])
      }
    }

    return filtered
  }
}
