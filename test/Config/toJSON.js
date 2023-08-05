const { expect } = require('chai')
const { Config } = require('../../')

describe('lib/Config:toJSON', () => {
  it('should have a JSON serializer', () => {
    const config = new Config()
    expect(config.toJSON).to.be.a('function')
  })

  it('should serialize the configuration on JSON.stringify', () => {
    const values = {
      foo: {
        bar: true,
        foobar: false
      }
    }

    const config = new Config()
    config.set(values)

    expect(JSON.parse(JSON.stringify(config))).to.eql(values)
  })
})
