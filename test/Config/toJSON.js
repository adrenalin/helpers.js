const { expect } = require('chai')
const Config = require('../../lib/Config')

describe('lib/Config:toJSON', () => {
  it('should have a JSON serializer', (done) => {
    const config = new Config()
    expect(config.toJSON).to.be.a('function')
    done()
  })

  it('should serialize the configuration on JSON.stringify', (done) => {
    const values = {
      foo: {
        bar: true,
        foobar: false
      }
    }

    const config = new Config()
    config.set(values)

    expect(JSON.parse(JSON.stringify(config))).to.eql(values)
    done()
  })
})
