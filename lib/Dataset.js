const castToArray = require('./castToArray')
const hasAny = require('./hasAny')

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
   * Alias "length" for "size"
   *
   * @alias Dataset#size
   */
  get length () {
    return this.size
  }

  /**
   * Alias "includes" for "has"
   *
   * @alias Dataset#includes
   */
  get includes () {
    return this.has
  }

  /**
   * Alias "contains" for has
   *
   * @alias Dataset#contains
   */
  get contains () {
    return this.has
  }

  constructor (data, options) {
    super(data || [])

    const $ = {
      options: options || {},
      indices: {},
      mapped: {}
    }

    if ($.options.id) {
      $.indices[$.options.id] = $.mapped = {}
    }

    if ($.options.indices) {
      castToArray($.options.indices)
        .filter(k => k)
        .forEach((k) => {
          $.indices[k] = $.indices[k] || {}
        })
    }

    Object.defineProperty(this, '$', {
      value: $,
      writable: false
    })

    if (data != null) {
      this.addToIndices(data)
    }
  }

  /**
   * Add values to map. This is for backwards compatibility.
   *
   * @method Dataset#addToMap
   * @param { mixed } values          An individual value, an array or a Set
   * @return { Dataset }              This instance
   */
  addToMap (values) {
    return this.addToIndices(values)
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

    if (this.$) {
      this.addToIndices(values)
    }
  }

  /**
   * Add values to indices
   *
   * @method Dataset#addToIndices
   * @param { mixed } values          An individual value, an array or a Set
   * @return { Dataset }              This instance
   */
  addToIndices (values) {
    castToArray(values)
      .forEach((item) => {
        for (const k in this.$.indices) {
          const index = this.$.indices[k]
          const key = item[k]

          if (key) {
            index[key] = item
          }
        }
      })

    return this
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
   * Copy the current dataset
   *
   * @method Dataset#copy
   * @return { Dataset }              Copy of this instance
   */
  copy () {
    return new this.constructor(this, this.$.options)
  }

  /**
   * Merge datasets
   *
   * @method Dataset#merge
   * @param { Dataset[] } data        Datasets to merge
   * @return { Dataset }              Merged datasets
   */
  merge (...data) {
    for (const values of data) {
      this.add(...values)
    }

    return this
  }

  /**
   * Alias for merge
   *
   * @method Dataset#concat
   */
  get concat () {
    return this.merge
  }

  /**
   * Delete an item
   *
   * @method Dataset#delete
   * @param { mixed[] } values        Any value
   */
  delete (...values) {
    values.forEach((v) => {
      super.delete(v)

      for (const key in this.$.indices) {
        delete this.$.indices[key][v[key]]
      }
    })
  }

  /**
   * Clear the dataset
   *
   * @method Dataset#clear
   */
  clear () {
    for (const key in this.$.indices) {
      this.$.indices[key] = {}
    }

    super.clear()
  }

  /**
   * Alias "truncate" for "clear"
   *
   * @alias Dataset#clear
   */
  get truncate () {
    return this.clear
  }

  /**
   * Get item by id
   *
   * @method Dataset#getById
   * @param { number|string } id      Value of the id property
   * @return { mixed }                Stored value
   */
  getById (id) {
    return this.$.mapped[id]
  }

  /**
   * Get item by indexed value
   *
   * @method Dataset#getByIndex
   * @param { string } index          Index
   * @param { number|string } id      Value of the id property
   * @return { mixed }                Stored value
   */
  getByIndex (index, id) {
    try {
      return this.$.indices[index][id]
    } catch (err) {
      return undefined
    }
  }

  /**
   * Get by property
   *
   * @method Dataset#getByProperty
   * @param { string } prop           Property
   * @param { mixed } value           Needle
   * @param { string } recursive      Recursive property
   */
  getByProperty (prop, value, recurseProp = null) {
    const data = new Dataset(null, this.$.options)
    const values = castToArray(value)

    this.forEach((item) => {
      if (hasAny(item[prop], values)) {
        data.add(item)

        if (recurseProp) {
          this.getByProperty(prop, [item[recurseProp]], recurseProp).forEach(child => data.add(child))
        }
      }
    })

    return data
  }

  /**
   * Map like an array map
   *
   * @method Dataset#map
   * @param { function } iterator     Iterator function
   * @return { mixed[] }              An array with the value iterator gives
   */
  map (iterator) {
    return Array.from(this).map(iterator)
  }

  /**
   * Filter like an array filter
   *
   * @method Dataset#filetr
   * @param { function|object } iterator  Iterator function or an object filter
   * @param { boolean } matchAny          Match any flag
   * @return { mixed[] }                  An array with the value iterator gives
   */
  filter (filter, matchAny) {
    const filtered = new Dataset(null, this.$.options)

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
   * @method Dataset#reduce
   * @param { function } reducer      Reducer function
   * @param { mixed } initial         Initial value
   * @return { mixed }                Reduced value
   */
  reduce (reducer, initial) {
    return Array.from(this).reduce(reducer, initial)
  }

  /**
   * Sort a dataset. Unlike Array.sort this will not change the original data
   * but will return a new sorted Dataset instead.
   *
   * @method Dataset#sort
   * @param { function } callback     Sort callback
   * @return { Dataset }              Sorted dataset
   */
  sort (callback) {
    return new Dataset(Array.from(this).sort(callback), this.$.options)
  }

  /**
   * Reverse a dataset. Unlike Array.reverse this will not change the original
   * data but will return a new sorted Dataset instead.
   *
   * @method Dataset#reverse
   * @return { Dataset }              Reversed dataset
   */
  reverse () {
    return new Dataset(Array.from(this).reverse(), this.$.options)
  }

  /**
   * Find the first occurence from a dataset
   *
   * @method Dataset#find
   * @param { function } callback     Find callback
   * @return { mixed }                Dataset item
   */
  find (callback) {
    return Array.from(this).find(callback)
  }

  /**
   * Find the last occurence from a dataset
   *
   * @method Dataset#findLast
   * @param { function } callback     Find callback
   * @return { mixed }                Dataset item
   */
  findLast (callback) {
    return Array.from(this).reverse().find(callback)
  }

  /**
   * Serialize dataset as JSON
   *
   * @method Dataset#toJSON
   * @return { array }                JSON serializable array
   */
  toJSON (reducer, initial) {
    return Array.from(this)
  }
}
