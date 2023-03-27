const Moment = require('moment-timezone')
const { InvalidArgument } = require('@vapaaradikaali/errors')
const castToArray = require('./castToArray')
const getValue = require('./getValue')
const isObject = require('./isObject')
const splitStringIntoChunks = require('./splitStringIntoChunks')
const parseQueryString = require('./parseQueryString')
const locales = {}
const undefinedLocales = []

const quantifiers = {
  m: Math.pow(10, -3),
  '-': 1,
  k: Math.pow(10, 3),
  M: Math.pow(10, 6),
  B: Math.pow(10, 9),
  T: Math.pow(10, 12),
  P: Math.pow(10, 15)
}

/**
 * Localization error
 *
 * @class LocalizationError
 */
class LocalizationError extends Error {}

/**
 * Invalid timestamp error
 *
 * @class InvalidTimestamp
 */
class InvalidTimestamp extends LocalizationError {}

/**
 * Invalid formatter error
 *
 * @class InvalidFormatter
 */
class InvalidFormatter extends LocalizationError {}

const warnings = Moment.suppressDeprecationWarnings

const errors = {
  INVALID_TIMESTAMP: InvalidTimestamp,
  INVALID_FORMATTER: InvalidFormatter,
  INVALID_ARGUMENT: InvalidArgument
}

let localeLogger = (level, ...args) => {
  console.log(...args)
}

/**
 * Localization class
 *
 * @class Localization
 * @example
 *
 * `const l10n = new Localization('fi', 'en')`
 *
 * @param { string } [lang]         Localization language
 * @param { string } [fallbackLang] Fallback language if the main language is not found
 */
module.exports = class Localization {
  /**
   * @const { string } Localization.UPPERCASE
   */
  static get UPPERCASE () {
    return 'uppercase'
  }

  /**
   * @const { string } Localization.LOWERCASE
   */
  static get LOWERCASE () {
    return 'lowercase'
  }

  /**
   * @const { string } Localization.TITLECASE
   */
  static get TITLECASE () {
    return 'titlecase'
  }

  /**
   * @const { string } Localization.PARAGRAPHCASE
   */
  static get PARAGRAPHCASE () {
    return 'paragraphcase'
  }

  /**
   * @const { string } Localization.CAMELCASE
   */
  static get CAMELCASE () {
    return 'camelcase'
  }

  /**
   * @const { string } Localization.UNDERSCORECASE
   */
  static get UNDERSCORECASE () {
    return 'underscorecase'
  }

  /**
   * @const { Errors.InvalidTimestamp } Localization.INVALID_TIMESTAMP
   */
  static get INVALID_TIMESTAMP () {
    return InvalidTimestamp
  }

  static get QUANTIFIERS () {
    return quantifiers
  }

  /**
   * Static errros wrapper
   *
   * @const { object } Localization.errors
   */
  static get errors () {
    return errors
  }

  /**
   * Errors wrapper
   *
   * @const { object } Localization#errors
   */
  get errors () {
    return errors
  }

  /**
   * Validate rounding type
   *
   * @method Localization.validateRounding
   * @param { string } rounding       Enumerates "round", "ceil", "floor"
   */
  static validateRounding (rounding) {
    if (!['round', 'ceil', 'floor'].includes(rounding)) {
      throw new InvalidArgument(`Only 'round', 'ceil', 'floor' are accepted as rounding methods, now got '${rounding}'`)
    }
  }

  /**
   * Get rounded number
   *
   * @method Localization.getRoundedNumber
   * @param { number|string } value         Number or a numeric string to round
   * @param { number } [precision]          Rounding precision
   * @param { string } [rounding="round"]   Enumerates "round", "ceil", "floor"
   * @return { number }                     Rounded number
   */
  static getRoundedNumber (value, precision, rounding) {
    const v = parseFloat(value)

    if (isNaN(v)) {
      throw new InvalidArgument('Localization.getRoundedNumber requires a number or a numeric string the first argument')
    }

    if (precision == null) {
      return v
    }

    rounding = rounding || 'round'

    // Validate the given rounding type
    Localization.validateRounding(rounding)

    const pow = Math.pow(10, precision)
    return Math[rounding](v * pow) / pow
  }

  /**
   * Convert case for a string
   *
   * @method Localization.toCase
   * @param { string } input          Input string
   * @param { string } toCase         Case for the output
   * @return { string }               String converted to the given case
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
   * Register a logger for the localization. This will log e.g. missing locales
   *
   * @function Localization.registerLogger
   * @example
   *
   * ```
   * Localization.registerLogger((...args) => console.log(...args))
   * ```
   *
   * @method Localization.registerLogger
   * @param { function } logger       Callback function
   */
  static registerLogger (logger) {
    if (!(logger instanceof Function)) {
      throw new InvalidArgument('Logger has to be a callback function')
    }

    localeLogger = logger
  }

  /**
   * Shorthand for the static method Localization.registerLogger
   *
   * @method Localization#registerLogger
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
   * @method Localization#logger
   * @param { number } level          Log level
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
   * @method Localization.registerLocale
   * @param { string } locale         Locale key
   * @param { object } translations   Translations
   * @return { Localization }         This instance
   */
  static registerLocale (locale, translations) {
    if (!isObject(translations)) {
      throw new InvalidArgument('Invalid locale, each node has to be an object')
    }

    for (const lang in translations) {
      if (typeof translations[lang] !== 'string') {
        throw new InvalidArgument('Invalid locale, each language node has to be a string')
      }
    }

    locales[locale] = translations
  }

  /**
   * Register locales
   *
   * @method Localization.registerLocales
   * @param { object } data           Locales to register
   * @return { Localization }         This instance
   */
  static registerLocales (data) {
    if (!isObject(data)) {
      throw new InvalidArgument('registerLocales requires an object as its argument')
    }

    // Validate locale
    for (const key in data) {
      Localization.registerLocale(key, data[key])
    }

    return this
  }

  /**
   * Alias to the static registerLocale method
   *
   * @method Localization#registerLocale
   * @return { function }             Constructor.toCase function
   */
  get registerLocale () {
    return Localization.registerLocale
  }

  /**
   * Alias to the static registerLocales method
   *
   * @method Localization#registerLocales
   * @return { function }             Constructor.toCase function
   */
  get registerLocales () {
    return Localization.registerLocales
  }

  /**
   * Get locales
   *
   * @static
   * @method Localization.getLocales
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
   * Get locales, an instance convenience alias for the static method
   * Localization.getLocales
   *
   * @method Localization#getLocales
   * @param { string } [lang]         Language constraint
   * @return { object }               Registered locales
   */
  get getLocales () {
    return Localization.getLocales
  }

  /**
   * Unregister locales
   *
   * @method Localization.unregisterLocales
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
   * @method Localization#unregisterLocales
   * @return { function }             Constructor.toCase function
   */
  get unregisterLocales () {
    return Localization.unregisterLocales
  }

  /**
   * Alias to the static registerLocales method
   *
   * @method Localization.unregisterLocale
   * @return { function }             Constructor.toCase function
   */
  static get unregisterLocale () {
    return Localization.unregisterLocales
  }

  /**
   * Alias to the static registerLocales method
   *
   * @method Localization#unregisterLocale
   * @return { function }             Constructor.toCase function
   */
  get unregisterLocale () {
    return Localization.unregisterLocales
  }

  /**
   * Alias to the static toCase method
   *
   * @method Localization#toCase
   * @return { function }             Constructor.toCase function
   */
  get toCase () {
    return Localization.toCase
  }

  /**
   * Constructor
   *
   * @param { string } [lang]         Localization language
   * @param { string } [fallbackLang] Fallback language if the main language is not found
   */
  constructor (lang = null, fallbackLang) {
    this.lang = lang || 'en'
    this.fallbackLang = fallbackLang || lang
  }

  /**
   * Set language
   *
   * @param { string } lang           Language
   * @return { Localization }         This instance
   */
  setLang (lang) {
    if (typeof lang !== 'string') {
      throw new InvalidArgument('setLang requires a string as an argument')
    }

    if (!lang) {
      throw new InvalidArgument('No language provided')
    }

    this.lang = lang
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
   * @param { string } lang           Language
   * @return { Localization }         This instance
   */
  setFallbackLang (lang) {
    if (typeof lang !== 'string') {
      throw new InvalidArgument('setLang requires a string as an argument')
    }

    if (!lang) {
      throw new InvalidArgument('No language provided')
    }

    this.fallbackLang = lang
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
  getAsVariable (locale, lang) {
    switch (this.getFormatterForVariable(locale)) {
      case 'number':
        return this.numberFormat(locale.variable, locale.precision, lang)

      case 'percent':
        return this.percentFormat(locale.variable, locale.precision, lang)

      case 'money':
        return this.moneyFormat(locale.variable, locale.precision, lang)

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
   * @param { string } lang           Language
   * @param { mixed } locale          Requested locale
   * @param { object } [options]      Options
   * @param { mixed } [...args]       Extra arguments for substrings
   * @return { object }               Locale object
   */
  getLocaleObject (lang, locale, ...args) {
    const options = this.getAsOption(args[0])

    locale = isObject(locale) ? locale : { locale }

    const needle = {
      key: locale.locale,
      case: locale.case || null,
      lang: locale.lang || lang,
      isVariable: !!locale.isVariable,
      ...options
    }

    const alias = this.getValue(needle.key, ['alias'])

    if (alias) {
      needle.key = alias
    }

    return needle
  }

  /**
   * Get a localized string in the given language
   *
   * @param { string } lang           Requested language
   * @param { mixed } locale          Requested locale
   * @param { object } [options]      Options
   * @param { mixed } [...args]       Extra arguments for substrings
   * @return { string }               Localized value or the given string if not found
   */
  getInLang (lang, locale, ...args) {
    if (Array.isArray(locale)) {
      return this.getInLang(lang, ...locale, ...args)
    }

    // Internal search object
    if (locale == null) {
      return ''
    }

    // Expand variables
    if (locale && Object.keys(locale).includes('locale') && Object.keys(locale).includes('variable')) {
      const newArgs = args.slice()
      const variables = castToArray(locale.variable)
        .map((variable) => {
          if (isObject(variable)) {
            return variable
          }

          return { variable }
        })

      newArgs.splice(0, 0, ...variables)
      return this.getInLang(lang, locale.locale, ...newArgs)
    }

    // Handle variables
    if (locale && Object.keys(locale).includes('variable')) {
      return this.getAsVariable(locale, lang)
    }

    const needle = this.getLocaleObject(lang, locale, ...args)

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

    return this.applyFormatters(lang, needle, localized, args)
  }

  /**
   * Apply formatters
   *
   * @private
   * @method Localization#applyFormatters
   * @oaram { string } lang           Language
   * @param { object } locale         Locale object
   * @param { string } localized      Translated string before formatters
   * @param {  }
   */
  applyFormatters (lang, needle, localized, args) {
    // Match parameters
    let i = 1

    const parameters = [needle.key, ...args]
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
        throw new InvalidArgument('Invalid argument for locale')
      })

    return String(localized)
      .replace(/\{\{(.+?)\}\}/g, (r, a) => {
        // Trim
        a = a.replace(/(^\s+|\s*$)/g, '')
        const t = this.get(a)

        return t === a ? r : t
      })
      .replace(/(\\)?%([a-z])([0-9]*)(\[(.+)\])?/g, (r, escaped, type, index, paramsWrapped, params) => {
        if (escaped) {
          return r.replace(/^\\/, '')
        }

        index = Number(index || i++)

        if (parameters[index] == null) {
          throw new InvalidArgument(`Parameter mismatch for "${needle.key}", missing parameter ${index}`)
        }

        const formatterOptions = {
          lang
        }

        try {
          const parsed = parseQueryString(params)
          for (const k in parsed) {
            formatterOptions[k] = parsed[k]
          }
        } catch (err) {
          // Not a query string, ignore silently
        }

        let precision

        switch (type) {
          case 'd':
            formatterOptions.format = formatterOptions.format || params
            return this.dateFormat(parameters[index], formatterOptions)

          case 'm':
            formatterOptions.precision = (formatterOptions.precision || params) == null ? null : parseInt(formatterOptions.precision || params)
            return this.moneyFormat(parameters[index], formatterOptions)

          case 'n':
            formatterOptions.precision = (formatterOptions.precision || params) == null ? null : parseInt(formatterOptions.precision || params)
            return this.numberFormat(parameters[index], formatterOptions)

          case 'i':
            formatterOptions.precision = 0
            formatterOptions.rounding = formatterOptions.rounding || 'round'
            return this.numberFormat(parameters[index], formatterOptions)

          case 'p':
            return this.percentFormat(parameters[index], { lang, precision: params == null ? null : parseInt(params) })

          case 'q':
            precision = formatterOptions.precision || (isNaN(params) ? null : parseInt(params))
            return this.quantityFormat(parameters[index], { lang, precision, rounding: formatterOptions.rounding })

          case 's':
            return this.getInLang(lang, parameters[index])

          default:
            throw new InvalidFormatter(`Invalid formatter "${r}"`)
        }
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
   * @param { string } lang           Requested language
   * @return { string }               Decimal separator
   */
  getDecimalSeparator (lang = null) {
    return this.getValue(
      'decimalSeparator',
      [
        lang || this.getLang(),
        this.getFallbackLang()
      ],
      '.'
    )
  }

  /**
   * Get thousands separator for the locale system
   *
   * @param { string } lang           Requested language
   * @return { string }               Thousands separator
   */
  getThousandSeparator (lang = null) {
    return this.getValue(
      'thousandSeparator',
      [
        lang || this.getLang(),
        this.getFallbackLang()
      ],
      ','
    )
  }

  /**
   * Format a number according to the locales
   '
   * @param { Number } value          Number to be formatted
   * @param { mixed } options         Options or precision, lang, decimal separator, thousand separator and rounding method
   * @return { String }               Localized number
   */
  numberFormat (value, ...options) {
    if (value == null) {
      return null
    }

    value = parseFloat(value)
    if (isNaN(value)) {
      throw new InvalidArgument('Localization.numberFormat requires a numeric value as its first argument')
    }

    const opts = {
      precision: typeof options[0] === 'number' ? options[0] : null,
      lang: typeof options[1] === 'string' ? options[1] : this.getLang(),
      isVariable: true,
      rounding: typeof options[4] === 'string' ? options[4] : null,
      digits: null
    }

    if (isObject(options[0])) {
      if (options.length > 1) {
        throw new InvalidArgument('Either give a configuration object or spread by precision, lang, decimal, thousand, rounding')
      }

      for (const key in options[0]) {
        opts[key] = options[0][key]
      }
    }

    if (opts.rounding) {
      opts.precision = opts.precision || 0
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

    // Digits
    if (opts.digits) {
      if (isNaN(opts.digits)) {
        throw new InvalidArgument(`numberFormat expects the option "digits" to be a number, got ${JSON.stringify(opts.digits)}`)
      }

      const pow = Math.floor(Math.log(Math.abs(value)) / Math.LN10)
      opts.precision = opts.digits - pow - 1
    }

    // Rounding
    value = this.constructor.getRoundedNumber(value, opts.precision, opts.rounding)

    opts.decimal = typeof options[2] === 'string' ? options[2] : opts.decimal || this.getDecimalSeparator(opts.lang)
    opts.thousand = typeof options[3] === 'string' ? options[3] : opts.thousand || this.getThousandSeparator(opts.lang)

    const parts = value.toFixed(Math.max(0, opts.precision || 0)).split('.')

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
    if (value == null) {
      return null
    }

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
   * Localized monet format
   *
   * @param { number } value              Value to format
   * @param { string|object } [options]   Options or unit
   * @return { string}                    Localized number
   */
  quantityFormat (value, options) {
    if (value == null) {
      return null
    }

    value = typeof value === 'number' ? value : parseFloat(String(value))

    if (isNaN(value)) {
      throw new InvalidArgument(`quantityFormat excepts a number or a numeric string as its first argument, got ${JSON.stringify(value)}`)
    }

    const opts = {
      unit: typeof options === 'string' ? options : '',
      precision: null,
      digits: null,
      threshold: 1,
      ...(isObject(options) ? options : {})
    }

    opts.precision = typeof opts.precision === 'string' ? parseInt(opts.precision) : opts.precision
    opts.q = opts.q || Object.keys(quantifiers).join('')

    const formatValue = (k = '') => {
      k = k || ''
      const quantifier = k.replace(/(-| )+/g, '')
      return `${this.numberFormat(this.constructor.getRoundedNumber(value / quantifiers[k], opts.precision, opts.rounding), { precision: opts.precision, digits: opts.digits })} ${quantifier}${opts.unit}`.replace(/ +$/, '')
    }

    const q = opts.q.split('').reverse()
    let match = q[0]

    for (const k of q) {
      const d = quantifiers[k] * opts.threshold
      match = k

      if (d < value) {
        break
      }
    }

    return formatValue(match)
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
    if (value == null) {
      return null
    }

    return `${this.numberFormat(value, ...options)} %`
  }

  /**
   * Localized date format. Fallback to ISO-8601.
   *
   * @param { mixed } value           Date, Moment or any string understood by Moment
   * @param { object } [opts]         Options
   * @return { String }               Localized date
   */
  dateFormat (value, opts = {}) {
    try {
      opts = opts || {}
      const lang = opts.lang || this.getLang()
      Moment.suppressDeprecationWarnings = true
      const moment = new Moment(value)

      if (!moment.isValid()) {
        throw new InvalidTimestamp('The given value for dateFormat is not valid')
      }

      const format = opts.format || this.getInLang(lang, {
        locale: 'dateFormat',
        default: 'YYYY-MM-DD'
      })

      const tzMatch = value.toString().match(/(Z|[+-][0-9]{1,2}:[0-9]{1,2})$/)

      // Keep the explicit timezone from the source when applicable
      if (tzMatch) {
        moment.tz(tzMatch[1] === 'Z' ? 'UTC' : tzMatch[1])
      }

      if (opts.tz) {
        moment.tz(opts.tz)
      }

      switch (format) {
        case 'iso':
          return moment.toISOString(!!opts.tz).replace(/\.000/, '')

        case 'iso-date':
          return moment.format('YYYY-MM-DD')

        case 'iso-time':
          return moment.format('HH:mm:ss')

        default:
          return moment.format(format)
      }
    } catch (err) { // eslint-disable-line no-useless-catch
      throw err
    } finally {
      Moment.suppressDeprecationWarnings = warnings
    }
  }

  /**
   * Localized time format. Fallback to ISO-8601.
   *
   * @param { mixed } value           Date, Moment or any string understood by Moment
   * @return { String }               Localized time
   */
  timeFormat (value) {
    try {
      Moment.suppressDeprecationWarnings = true
      const moment = new Moment(value)

      if (!moment.isValid()) {
        throw new InvalidTimestamp('The given value for timeFormat is not valid')
      }

      const format = this.get({
        locale: 'timeFormat',
        default: 'HH:mm:ss'
      })

      return moment.format(format)
    } catch (err) {
      // Try to manually handle time only inputs
      if (err instanceof InvalidTimestamp) {
        const moment = new Moment(value, ['HH:mm:ss', 'HH:mm'])

        if (!moment.isValid()) {
          throw err
        }

        return this.timeFormat(moment)
      }

      /* istanbul ignore next rethrow the original error */
      throw err
    } finally {
      Moment.suppressDeprecationWarnings = warnings
    }
  }
}
