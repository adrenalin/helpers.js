module.exports = function typecastString (value) {
  if (typeof value !== 'string') {
    return value
  }

  if (['true'].includes(value.toLowerCase())) {
    return true
  }

  if (['false'].includes(value.toLowerCase())) {
    return false
  }

  if (['', 'null'].includes(value.toLowerCase())) {
    return null
  }

  try {
    const parsed = parseFloat(value.replace(/,/, '.'))

    if (isNaN(parsed)) {
      throw new Error('Parse failed')
    }

    return parsed
  } catch (e) {
    return value
  }
}
