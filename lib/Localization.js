const getValue = require('./getValue')
const isObject = require('./isObject')
const splitStringIntoChunks = require('./splitStringIntoChunks')
const merge = require('./merge')
const locales = {}
const undefinedLocales = []

let localeLogger = (level, ...args) => {
  console.log(...args)
}

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

  static get CAMELCASE () {
    return 'camelcase'
  }

  static get UNDERSCORECASE () {
    return 'underscorecase'
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
        return input
          .replace(/(^\D|\s+\D)/g, (r, c) => {
            return r.toUpperCase()
          })

      case 'paragraph':
      case 'paragraphcase':
      case Localization.PARAGRAPHCASE:
        return input.replace(/(^.|\.\s+.)/g, (r, c) => {
          return r.toUpperCase()
        })

      case 'camel':
      case 'camelcase':
      case Localization.CAMELCASE:
        return input
          .toLowerCase()
          .replace(/\W+/g, ' ')
          .replace(/[-_\s]([a-zA-Z0-9])/g, (match, char) => {
            return char.toUpperCase()
          })

      case 'underscore':
      case 'underscorecase':
      case Localization.UNDERSCORECASE:
        return input
          .replace(/([A-Z]+)/g, (match, char) => {
            return ` ${char.toLowerCase()}`
          })
          .toLowerCase()
          .replace(/\W+/g, ' ')
          .replace(/[-_\s]([a-zA-Z0-9])/g, (match, char) => {
            return `_${char.toLowerCase()}`
          })
          .replace(/^_/, '')
    }

    return input
  }

  /**
   * Register a logger for the localization
   *
   * @param { function } logger       Callback function
   */
  static registerLogger (logger) {
    if (typeof logger !== 'function') {
      throw new Error('Logger has to be a callback function')
    }

    localeLogger = logger
  }

  /**
   * Shorthand for the static method
   *
   * @param { function } logger       Callback function
   * @return { Localization }         This instance
   */
  registerLogger (logger) {
    this.constructor.registerLogger(logger)
    return this
  }

  /**
   * Call logger
   *
   * @param { string } level          Log level
   * @param { array } args            Logger arguments
   * @return { Localization }         This instance
   */
  logger (level, ...args) {
    localeLogger(level, ...args)
    return this
  }

  /**
   * Register locales
   *
   * @param { string } locale         Locale key
   * @param { object } translations   Translations
   * @return { Localization }         This instance
   */
  static registerLocale (locale, translations) {
    if (!isObject(translations)) {
      throw new Error('Invalid locale, each node has to be an object')
    }

    for (const lang in translations) {
      if (typeof translations[lang] !== 'string') {
        throw new Error('Invalid locale, each language node has to be a string')
      }
    }

    locales[locale] = translations
  }

  /**
   * Register locales
   *
   * @param { object } data           Locales to register
   * @return { Localization }         This instance
   */
  static registerLocales (data) {
    if (!isObject(data)) {
      throw new Error('registerLocales requires an object as its argument')
    }

    // Validate locale
    for (const key in data) {
      Localization.registerLocale(key, data[key])
    }

    return this
  }

  /**
   * Alias to the static registerLocales method
   *
   * @return { function }             Constructor.toCase function
   */
  get registerLocales () {
    return Localization.registerLocales
  }

  /**
   * Get locales
   *
   * @static
   * @param { string } [lang]         Language constraint
   * @return { object }               Registered locales
   */
  static getLocales (lang = null) {
    if (!lang) {
      return locales
    }

    const byLanguage = {}

    for (const key in locales) {
      const locale = locales[key][lang]
      if (locale) {
        byLanguage[key] = locale
      }
    }

    return byLanguage
  }

  /**
   * Get locales
   *
   * @return { object }               Registered locales
   */
  getLocales (...args) {
    return Localization.getLocales(...args)
  }

  /**
   * Unregister locales
   *
   * @param { mixed } data            Locales to be registered as a string or array of strings
   * @return { Localization }         This instance
   */
  static unregisterLocales (data) {
    if (!Array.isArray(data)) {
      data = [data]
    }

    data.forEach((locale) => {
      if (isObject(locale)) {
        for (const key in locale) {
          if (!locales[key]) {
            continue
          }

          const langs = Array.isArray(locale[key]) ? locale[key] : [locale[key]]

          langs.forEach((lang) => {
            delete locales[key][lang]
          })

          // Delete empty sets
          if (!Object.keys(locales[key]).length) {
            delete locales[key]
          }
        }
        return
      }

      delete locales[locale]
    })

    return this
  }

  /**
   * Alias to the static registerLocales method
   *
   * @return { function }             Constructor.toCase function
   */
  get unregisterLocales () {
    return Localization.unregisterLocales
  }

  /**
   * Alias to the static registerLocales method
   *
   * @return { function }             Constructor.toCase function
   */
  static get unregisterLocale () {
    return Localization.unregisterLocales
  }

  /**
   * Alias to the static registerLocales method
   *
   * @return { function }             Constructor.toCase function
   */
  get unregisterLocale () {
    return Localization.unregisterLocales
  }

  /**
   * Alias to the static toCase method
   *
   * @return { function }             Constructor.toCase function
   */
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
   * Get formatter for variable
   *
   * @param { object } locale         Locale object
   * @return { string }               Formatter
   */
  getFormatterForVariable (locale) {
    if (locale.format) {
      return locale.format
    }

    if (typeof locale.variable === 'number') {
      return 'number'
    }

    return 'string'
  }

  /**
   * Get locale as variable
   *
   * @param { object }                Locale object
   * @return { string }               Formatted variable
   */
  getAsVariable (locale, language) {
    switch (this.getFormatterForVariable(locale)) {
      case 'number':
        return this.numberFormat(locale.variable, locale.precision, language)

      case 'percent':
        return this.percentFormat(locale.variable, locale.precision, language)

      case 'money':
        return this.moneyFormat(locale.variable, locale.precision, language)

      case 'string':
      default:
        if (locale.variable == null) {
          return ''
        }

        return String(locale.variable)
    }
  }

  /**
   * Internal helper to get an argument as option or an empty object
   *
   * @param { mixed } arg             Argument
   * @return { object }               Option
   */
  getAsOption (arg) {
    if (!isObject(arg) || arg.locale != null || arg.variable != null) {
      return {}
    }

    return arg
  }

  /**
   * Get locale object
   *
   * @param { string } language       Language
   * @param { mixed } locale          Requested locale
   * @param { object } [options]      Options
   * @param { mixed } [...args]       Extra arguments for substrings
   * @return { object }               Locale object
   */
  getLocaleObject (language, locale, ...args) {
    const options = this.getAsOption(args[0])

    locale = isObject(locale) ? locale : { locale }

    const needle = merge(
      {
        key: locale.locale,
        case: locale.case || null,
        lang: locale.lang || language,
        isVariable: !!locale.isVariable
      },
      options
    )

    const alias = this.getValue(needle.key, ['alias'])

    if (alias) {
      needle.key = alias
    }

    return needle
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
    if (Array.isArray(locale)) {
      return this.getInLang(language, ...locale, ...args)
    }

    // Internal search object
    if (locale == null) {
      return ''
    }

    // Handle variables
    if (locale && Object.keys(locale).includes('variable')) {
      return this.getAsVariable(locale, language)
    }

    const needle = this.getLocaleObject(language, locale, ...args)

    // Quantified value
    if (locale.quantifiers) {
      const amount = String(locale.amount || 0)
      locale.locale = needle.key = locale.quantifiers[amount] || locale.quantifiers.default || locale.key
      args.unshift({ locale: amount, isVariable: true })
    }

    // Set the default value if locale was not found
    needle.default = needle.default || locale.default || needle.key

    // Search suffixes for the locale
    const langs = [
      needle.lang,
      this.getFallbackLang()
    ]

    const localized = Localization.toCase(this.getValue(
      needle.key,
      langs,
      needle.default
    ), needle.case)

    if (localized === needle.key && !undefinedLocales.includes(needle.key) && !needle.isVariable && typeof needle.key !== 'number') {
      this.logger('warn', needle, 'missing')
      undefinedLocales.push(needle.key)
    }

    // Match parameters
    let i = 1
    const parameters = [locale].concat(args)
      .filter((arg) => {
        if (['string', 'number'].includes(typeof arg)) {
          return true
        }

        if (isObject(arg) && arg.locale != null) {
          return true
        }

        if (isObject(arg) && Object.keys(arg).includes('variable')) {
          return true
        }

        if (arg == null) {
          return false
        }

        console.error('Invalid argument for locale', arg)
        throw new Error('Invalid argument for locale')
      })

    return String(localized).replace(/%s([0-9]*)/g, (r, a) => {
      const index = Number(a || i++)

      if (parameters[index] == null) {
        throw new Error(`Parameter mismatch for "${needle.key}", missing parameter ${index}`)
      }

      return this.getInLang(language, parameters[index])
    })
  }

  /**
   * Internal helper function to get value from the stored locales for n
   * suffixes
   *
   * @param { string } locale           Locale key
   * @param { array } suffixes          Set of suffixes
   * @param { string } [defaultValue]   Default value if locale is not found
   * @return { string }                 Value from the locales or locale itself
   */
  getValue (locale, suffixes, defaultValue) {
    const paths = []

    suffixes.forEach((suffix) => {
      if (!suffix) {
        return
      }

      paths.push(`${locale}.${suffix}`)
    })

    return getValue(locales, paths, defaultValue)
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
   * Get by count
   *
   * @param { string } singular       Singular locale key
   * @param { string } plural         Plural locale key
   * @param { number } amount         Amount
   * @return { string }               Localized string
   */
  getByCount (singular, plural, amount, ...args) {
    const locale = {
      amount: amount,
      quantifiers: {
        1: singular,
        default: plural
      }
    }

    return this.get(locale, ...args)
  }

  /**
   * Get decimal separator for the locale system
   *
   * @param { string } language       Requested language
   * @return { string }               Decimal separator
   */
  getDecimalSeparator (language = null) {
    return this.getValue(
      'decimalSeparator',
      [
        language || this.getLang(),
        this.getFallbackLang()
      ],
      '.'
    )
  }

  /**
   * Get thousands separator for the locale system
   *
   * @param { string } language       Requested language
   * @return { string }               Thousands separator
   */
  getThousandSeparator (language = null) {
    return this.getValue(
      'thousandSeparator',
      [
        language || this.getLang(),
        this.getFallbackLang()
      ],
      ','
    )
  }

  /**
   * Format a number according to the locales
   '
   * @param { Number } value          Number to be formatted
   * @param { mixed } options         Options or precision, lang, decimal separator, thousand separator
   * @return { String }               Localized number
   */
  numberFormat (value, ...options) {
    if (value == null) {
      return null
    }

    value = parseFloat(value)
    if (isNaN(value)) {
      throw new Error('Localization.numberFormat requires a numeric value as its first argument')
    }

    const opts = {
      precision: typeof options[0] === 'number' ? options[0] : null,
      lang: typeof options[1] === 'string' ? options[1] : this.getLang(),
      isVariable: true
    }

    if (opts.precision == null) {
      const str = String(value)

      if (str.match(/e\-[0-9]+$/)) { // eslint-disable-line no-useless-escape
        opts.precision = Number(str.match(/e\-([0-9]+)$/)[1]) // eslint-disable-line no-useless-escape
      }

      if (str.match(/\.[0-9]+$/)) {
        opts.precision = str.match(/\.([0-9]+)$/)[1].length
      }
    }

    if (isObject(options[0])) {
      if (options.length > 1) {
        throw new Error('Either give a configuration object or spread by precision, language, decimal and thousand')
      }

      for (const key in options[0]) {
        opts[key] = options[0][key]
      }
    }

    opts.decimal = typeof options[2] === 'string' ? options[2] : opts.decimal || this.getDecimalSeparator(opts.lang)
    opts.thousand = typeof options[3] === 'string' ? options[3] : opts.thousand || this.getThousandSeparator(opts.lang)

    const parts = value.toFixed(opts.precision || 0).split('.')

    const int = splitStringIntoChunks(parts[0], 3, opts.thousand, false)
    const dec = parts[1] ? opts.decimal + splitStringIntoChunks(parts[1], 3, ' ', true) : ''

    return `${int}${dec}`
  }

  /**
   * Localized monet format
   *
   * @param { number } value              Value to format
   * @param { boolean } [decimal=true]    Include decimals
   * @return { string}                    Localized number
   */
  moneyFormat (value, decimal = true) {
    const precision = decimal ? 2 : 0
    return this.get(
      {
        locale: 'moneyFormat',
        default: '%s e'
      },
      {
        locale: this.numberFormat(value, precision),
        isVariable: true
      }
    )
  }

  /**
   * Byte format or factors of 1024
   *
   * @param { number } value          Value to format
   * @param { number } precision      Number of decimals
   * @param { string } unit           Unit
   * @param { string } [power]        Force to the given power
   * @return { string }               Value formatted in the powers of 1024
   */
  byteFormat (value, precision = 1, unit = 'B', power = null) {
    if (isObject(precision)) {
      const opts = precision
      opts.precision = opts.precision != null ? opts.precision : 1
      opts.unit = opts.unit != null ? opts.unit : unit
      opts.power = opts.power != null ? opts.power : 1

      return this.byteFormat(value, opts.precision, opts.unit, opts.power)
    }

    const units = ['', 'k', 'M', 'G', 'T', 'P']
    let pow = 0

    for (let i = 0; i < units.length; i++) {
      const d = Math.pow(1024, i)

      if (Math.round(value / d) < 1) {
        break
      }

      pow = i
    }

    if (power && units.includes(power)) {
      pow = units.indexOf(power)
    }

    const v = value / Math.pow(1024, pow)
    const f = units[pow]

    return `${this.numberFormat(v, precision)} ${f}${unit}`
  }

  /**
   * Localized percent format. Gets the number from numberFormat and appends a
   * percent symbol to the return value.
   *
   * @param { Number } value          Number to be formatted
   * @param { mixed } options         Options or precision, lang, decimal separator, thousand separator
   * @return { String }               Localized number
   */
  percentFormat (value, ...options) {
    return `${this.numberFormat(value, ...options)} %`
  }
}
