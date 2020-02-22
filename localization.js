const getValue = require('./getValue')
const isObject = require('./isObject')
const locales = {}

module.exports = class Localization {
  constructor (language = null, fallbackLanguage) {
    this.lang = language || 'en'
    this.fallbackLang = fallbackLanguage || language
  }

  /**
   * Set language
   *
   * @param { string } language       Language
   * @return { Localization }         This instance
   */
  setLang (language) {
    if (typeof language !== 'string') {
      throw new Error('setLang requires a string as an argument')
    }

    if (!language) {
      throw new Error('No language provided')
    }

    this.lang = language
    return this
  }

  /**
   * Get the current language
   *
   * @return { string }               Current language
   */
  getLang () {
    return this.lang
  }

  /**
   * Set language
   *
   * @param { string } language       Language
   * @return { Localization }         This instance
   */
  setFallbackLang (language) {
    if (typeof language !== 'string') {
      throw new Error('setLang requires a string as an argument')
    }

    if (!language) {
      throw new Error('No language provided')
    }

    this.fallbackLang = language
    return this
  }

  /**
   * Get the current fallback language
   *
   * @return { string }               Current fallback language
   */
  getFallbackLang () {
    return this.fallbackLang
  }

  /**
   * Register locales
   *
   * @param { object } data           Locales to be registered
   * @return { Localization }         This instance
   */
  registerLocales (data) {
    if (!isObject(data)) {
      throw new Error('registerLocales requires an object as its argument')
    }

    // Validate locale
    for (const key in data) {
      const value = data[key]
      if (!isObject(value)) {
        throw new Error('Invalid locale, each node has to be an object')
      }

      for (const lang in value) {
        if (typeof value[lang] !== 'string') {
          throw new Error('Invalid locale, each language node has to be a string')
        }
      }
    }

    for (const key in data) {
      locales[key] = data[key]
    }

    return this
  }

  /**
   * Get a localized string in the given language
   *
   * @param { string } language       Requested language
   * @param { mixed } locale          Requested locale
   * @param { mixed } [...args]       Extra arguments for substrings
   * @return { string }               Localized value or the given string if not found
   */
  getInLang (language, locale, ...args) {
    // Internal search object
    const needle = {
      key: typeof locale === 'string' ? locale : locale.locale
    }

    // Set the default value if locale was not found
    needle.default = locale.default || needle.key

    // Search paths for the locale
    const paths = [
      `${needle.key}.${language}`
    ]

    // Use fallback language for the search if applicable
    if (this.getFallbackLang()) {
      paths.push(`${needle.key}.${this.getFallbackLang()}`)
    }

    const localized = getValue(
      locales,
      paths
    )

    if (localized == null) {
      return needle.default
    }

    // Match parameters
    let i = 1
    const parameters = [locale].concat(args || [])

    return localized.replace(/%s([0-9]*)/g, (r, a) => {
      const index = Number(a || i++)
      return this.getInLang(language, parameters[index] != null ? parameters[index] : r)
    })
  }
}
