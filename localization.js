const getValue = require('./getValue')
const isObject = require('./isObject')
const locales = {}

module.exports = class Localization {
  static get UPPERCASE () {
    return 'uppercase'
  }

  static get LOWERCASE () {
    return 'lowercase'
  }

  static get TITLECASE () {
    return 'titlecase'
  }

  static get PARAGRAPHCASE () {
    return 'paragraphcase'
  }

  get toCase () {
    return Localization.toCase
  }

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
   * @param { object } [options]      Options
   * @param { mixed } [...args]       Extra arguments for substrings
   * @return { string }               Localized value or the given string if not found
   */
  getInLang (language, locale, ...args) {
    // Internal search object
    const options = isObject(args[0]) && !args[0].locale ? args[0] : {}
    const needle = {
      key: typeof locale === 'string' ? locale : locale.locale,
      case: locale.case || null,
      ...options
    }

    const alias = getValue(locales, `${needle.key}.alias`)

    if (alias) {
      needle.key = alias
    }

    // Set the default value if locale was not found
    if (!needle.default) {
      needle.default = locale.default || needle.key
    }

    // Search paths for the locale
    const paths = [
      `${needle.key}.${language}`
    ]

    // Use fallback language for the search if applicable
    if (this.getFallbackLang()) {
      paths.push(`${needle.key}.${this.getFallbackLang()}`)
    }

    const localized = Localization.toCase(getValue(
      locales,
      paths,
      needle.default
    ), needle.case)

    // Match parameters
    let i = 1
    const parameters = [locale].concat(args)
      .filter((arg) => {
        if (typeof arg === 'string') {
          return true
        }

        if (isObject(arg) && arg.locale != null) {
          return true
        }

        console.error('Invalid argument for locale', arg)
        throw new Error('Invalid argument for locale')
      })

    return localized.replace(/%s([0-9]*)/g, (r, a) => {
      const index = Number(a || i++)

      if (parameters[index] == null) {
        throw new Error(`Parameter mismatch for "${needle.key}", missing parameter ${index}`)
      }

      return this.getInLang(language, parameters[index])
    })
  }

  /**
   * Get a localized string in the set language
   *
   * @param { mixed } locale          Requested locale
   * @param { object } [options]      Options
   * @param { mixed } [...args]       Extra arguments
   * @return { string }               Localized value or the given string if not found
   */
  get (locale, ...args) {
    return this.getInLang(this.getLang(), locale, ...args)
  }

  /**
   * Convert case for a string
   *
   * @param { string } input          Input string
   * @param { string } toCase         Case for the output
   */
  static toCase (input, toCase = null) {
    switch (String(toCase).toLowerCase()) {
      case 'upper':
      case 'uppercase':
      case Localization.UPPERCASE:
        return input.toUpperCase()

      case 'lower':
      case 'lowercase':
      case Localization.LOWERCASE:
        return input.toLowerCase()

      case 'title':
      case 'titlecase':
      case Localization.TITLECASE:
        return input.replace(/\b(.)/g, (r, c) => {
          return r.toUpperCase()
        })

      case 'paragraph':
      case 'paragraphcase':
      case Localization.PARAGRAPHCASE:
        return input.replace(/(^.|\.\s+.)/g, (r, c) => {
          return r.toUpperCase()
        })
    }

    return input
  }
}
