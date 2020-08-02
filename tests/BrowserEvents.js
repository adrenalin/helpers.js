const expect = require('expect.js')
const BrowserEvents = require('../lib/BrowserEvents')

describe('buildUrl', () => {
  it('should be a class', (done) => {
    const instance = new BrowserEvents()
    expect(instance).to.be.a(BrowserEvents)
    done()
  })

  it('should register events', (done) => {
    const eventName = 'shouldRegisterEvents'
    const instance = new BrowserEvents()
    instance.on(eventName, () => {
      done()
    })

    instance.trigger(eventName)
  })

  it('should not choke when one of the event listeners', (done) => {
    const eventName = 'shouldNotChoke'
    const instance = new BrowserEvents()
    instance.on(eventName, () => {
      throw new Error('Should not choke on error')
    })
    instance.on(eventName, () => {
      done()
    })

    instance.trigger(eventName)
  })

  it('should unregister all listeners when given the event name', (done) => {
    const eventName = 'shouldUnregisterEventListeners'
    const instance = new BrowserEvents()
    let hits = 0

    instance.on(eventName, () => {
      hits++
    })

    instance.on(eventName, () => {
      hits++
    })

    instance.off(eventName)
    instance.trigger(eventName)

    expect(hits).to.be(0)
    done()
  })

  it('should unregister the given event listener', (done) => {
    const eventName = 'shouldUnregisterGivenEventListener'
    const instance = new BrowserEvents()
    let hits = 0

    const listener = () => {
      hits++
    }

    instance.on(eventName, listener)

    instance.on(eventName, () => {
      hits++
    })

    instance.off(eventName, listener)
    instance.trigger(eventName)

    expect(hits).to.be(1)
    done()
  })
})
