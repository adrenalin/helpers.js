const Moment = require('moment')
const { InvalidArgument } = require('@vapaaradikaali/errors')
/**
 * Parse ISO 8601 temporal string
 */
module.exports = function parseTemporal (input) {
  input = String(input)
  const regs = input.match(/^P([0-9]+Y)?([0-9]+M)?([0-9]+D)?(?:T([0-9]+H)?([0-9]+M)?([0-9]+(?:\.[0-9]+)?S)?)?$/)

  if (!regs) {
    throw new InvalidArgument(`Cannot parse temporal from ${input}`)
  }

  const [year, month, day, hour, minute, second] = regs
    .slice(1, regs.length)
    .map((t) => {
      if (!t) {
        return null
      }

      return Number(t.replace(/[YMDHS]$/, ''))
    })

  // console.log(regs)
  // console.log('year', year)
  // console.log('month', month)
  // console.log('day', day)
  // console.log('hour', hour)
  // console.log('minute', minute)
  // console.log('second', second)

  const m = new Moment()
    .add(year || 0, 'years')
    .add(month || 0, 'months')
    .add(day || 0, 'days')
    .add(hour || 0, 'hours')
    .add(minute || 0, 'minutes')
    .add(second || 0, 'seconds')

  return m
}
