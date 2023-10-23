const sleep = require('../../../lib/sleep')

function testWorkerResourcesEcho (input) {
  return input
}

testWorkerResourcesEcho.allArgs = function testWorkerResourcesEchoAllArgs (...input) {
  return input
}

testWorkerResourcesEcho.sleep = async function testWorkerResourcesEchoSleep (input) {
  await sleep(10)
  return input
}

testWorkerResourcesEcho.error = async function testWorkerResourcesEchoError (input) {
  throw new Error('Planned failure')
}

module.exports = testWorkerResourcesEcho
