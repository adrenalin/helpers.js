const castToArray = require('./castToArray')
const getValue = require('./getValue')

/**
 * Dataset
 *
 * @class Dataset
 * @implements Set
 * @param { Array|Set } [data]        Initial data
 * @param { object } [options]        Options
 */
module.exports = class Dataset extends Set {
  /**
   * Alais for size
   *
   * @alias Dataset#size
   */
  get length () {
    return this.size
  }

  constructor (data, options) {
    super(data || [])

    const $ = {
      options: options || {},
      mapped: {}
    }

    Object.defineProperty(this, '$', {
      value: $,
      writable: false
    })

    this.addToMap(data)
  }

  /**
   * Add values to map
   *
   * @method Dataset#addToMap
   * @param { mixed } values          An individual value, an array or a Set
   */
  addToMap (values) {
    const idProp = getValue(this, '$.options.id')

    if (!idProp) {
      return
    }

    castToArray(values)
      .forEach((item) => {
        this.$.mapped[item[idProp]] = item
      })
  }

  /**
   * Add an item
   *
   * @method Dataset#add
   * @param { mixed[] } values        Any value
   */
  add (...values) {
    values.forEach((v) => {
      super.add(v)
    })

    this.addToMap(values)
  }

  /**
   * Array to map alias for add
   *
   * @property { function } Dataset#push
   */
  get push () {
    return this.add
  }

  /**
   * Delete an item
   *
   * @method Dataset#delete
   * @param { mixed[] } values        Any value
   */
  delete (...values) {
    const idProp = getValue(this, '$.options.id')

    values.forEach((v) => {
      super.delete(v)

      if (idProp) {
        delete this.$.mapped[v[idProp]]
      }
    })
  }

  /**
   * Get item by id
   *
   * @method Dataset#getById
   * @param { number|string }         Value of the id property
   * @return { mixed }                Stored value
   */
  getById (id) {
    return this.$.mapped[id]
  }

  /**
   * Map like an array map
   *
   * @param { function } iterator     Iterator function
   * @return { mixed[] }              An array with the value iterator gives
   */
  map (iterator) {
    return Array.from(this).map(iterator)
  }

  /**
   * Filter like an array filter
   *
   * @param { function|object } iterator  Iterator function or an object filter
   * @param { boolean } matchAny          Match any flag
   * @return { mixed[] }                  An array with the value iterator gives
   */
  filter (filter, matchAny) {
    const filtered = new Dataset()

    /**
     * Get filter callback function
     *
     * @private
     * @return { function }           Filter callback function
     */
    function getFilterCallback () {
      if (typeof filter === 'function') {
        return filter
      }

      if (matchAny) {
        /**
         * Filter calback function that matches any of the properties
         *
         * @private
         * @return { function }           Filter callback function
         */
        return function matchAnyFilter (value) {
          for (const key in filter) {
            if (value[key] === filter[key]) {
              return true
            }
          }

          return false
        }
      }

      /**
       * Filter calback function that matches all of the properties
       *
       * @private
       * @return { function }           Filter callback function
       */
      return function matchAllFilter (value) {
        for (const key in filter) {
          if (value[key] !== filter[key]) {
            return false
          }
        }

        return true
      }
    }

    const cb = getFilterCallback()

    this.forEach((v) => {
      if (cb(v)) {
        filtered.add(v)
      }
    })

    return filtered
  }

  /**
   * Reduce the dataset
   *
   * @param { function } reducer      Reducer function
   * @param { mixed } initial         Initial value
   * @return { mixed }                Reduced value
   */
  reduce (reducer, initial) {
    return Array.from(this).reduce(reducer, initial)
  }

  /**
   * Serialize dataset as JSON
   * @return { array }                JSON serializable array
   */
  toJSON (reducer, initial) {
    return Array.from(this)
  }
}
