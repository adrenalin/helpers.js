
const Moment = require('moment')
const parseTemporal = require('./parseTemporal')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const { parse } = require('yaml')

class StorageEngine {
  constructor () {
    this.stored = {}
  }

  setItem (key, value) {
    this.stored[key] = value.toString()
  }

  getItem (key) {
    return this.stored[key]
  }

  removeItem (key) {
    delete this.stored[key]
  }

  clear () {
    for (const key in this.stored) {
      delete this.stored[key]
    }
  }
}

/**
 * Storage class
 *
 * @class Storage
 * @param { mixed } engine            Storage engine
 */
module.exports = class Storage {
  /**
   * Validate storage key
   *
   * @method Storage.validateKey
   * @param {string} key              Storage key
   */
  static validateKey (key) {
    if (typeof key !== 'string') {
      throw new InvalidArgument('Storage expects the storage key to be a string')
    }
  }

  /**
   * Storage engine
   *
   * @const { StorageEngine } Storage.StorageEngine
   */
  static get StorageEngine () {
    return StorageEngine
  }

  /**
   * Get expires at
   *
   * @method Storage.getExpiresAt
   * @param { mixed } expiresAt       ISO 8601 temporal, seconds as number or anything Moment.js accepts
   * @return { undefined|Moment }     Undefined when no expiration is given, an instance of Moment otherwise
   */
  static getExpiresAt (expiresAt) {
    if (expiresAt == null) {
      return undefined
    }

    if (typeof expiresAt === 'number') {
      const m = new Moment()
      m.add(expiresAt, 'seconds')
      return m.toISOString()
    }

    try {
      const m = parseTemporal(expiresAt)
      return m.toISOString()
    } catch (err) {
      const m = new Moment(expiresAt)

      if (m.isValid()) {
        return m.toISOString()
      }
    }

    throw new InvalidArgument(`Could not get expiration timestamp from ${JSON.stringify(expiresAt)}`)
  }

  /**
   * Check if the timestamp is in the past
   *
   * @method Storage.hasExpired
   * @param { string } expiresAt      Expiration timestamp as ISO 8601 string
   * @return { boolean }              True if expired, otherwise false
   */
  static hasExpired (expiresAt) {
    const now = new Moment()
    const m = new Moment(expiresAt)

    return m.isBefore(now)
  }

  constructor (engine, prefix) {
    this.engine = engine || new StorageEngine()
    this.prefix = prefix ? `${prefix}:` : ''
  }

  /**
   * Set storage engine
   *
   * @method Storage#setEngines
   * @param { mixed } engine Storage engine
   */
  setEngine (engine) {
    this.engine = engine
  }

  /**
   * Set stored value
   *
   * @method Storage#set
   * @param { string } key            Storage key
   * @param { mixed } value           Storage value
   * @param { mixed } expiresAt       ISO 8601 temporal, seconds as number or anything Moment.js accepts
   */
  set (key, value, expiresAt) {
    Storage.validateKey(key)

    const store = {
      value,
      expiresAt: Storage.getExpiresAt(expiresAt)
    }

    this.engine.setItem(`${this.prefix}${key}`, JSON.stringify(store))
  }

  /**
   * Get stored value
   *
   * @method Storage#get
   * @param {string} key              Storage key
   * @param {mixed} defaultValue      Value if storage does not have anything
   * @returns mixed                   Stored value, default value or null
   */
  get (key, defaultValue) {
    Storage.validateKey(key)
    const stored = this.engine.getItem(`${this.prefix}${key}`)

    if (stored == null) {
      return defaultValue
    }

    const v = JSON.parse(stored)

    if (Storage.hasExpired(v.expiresAt)) {
      this.del(key)
      return defaultValue
    }

    return v.value
  }

  /**
   * Delete a storage key
   *
   * @method Storage#del
   * @param { string } key            Storage key
   */
  del (key) {
    Storage.validateKey(key)
    this.engine.removeItem(`${this.prefix}${key}`)
  }

  /**
   * Clear storage
   *
   * @method Storage#clear
   */
  clear () {
    this.engine.clear()
  }
}