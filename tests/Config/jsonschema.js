const expect = require('expect.js')
const Config = require('../../lib/Config')

describe('lib/Config:jsonschema', () => {
  const testSchema = {
    id: '/test/config',
    type: 'object',
    properties: {
      string: {
        type: ['null', 'string']
      }
    }
  }

  it('should have a method to set JSON schema', (done) => {
    const config = new Config()
    expect(config).to.have.property('setSchema')
    expect(config.setSchema).to.be.a('function')
    done()
  })

  it('should reject any invalid JSON schema as an argument', (done) => {
    const config = new Config()
    expect(config.setSchema).withArgs('foo').to.throwError()
    expect(config.setSchema).withArgs(['foo']).to.throwError()
    expect(config.setSchema).withArgs(['']).to.throwError()
    done()
  })

  it('should accept a valid JSON schema', (done) => {
    const config = new Config()
    config.setSchema(testSchema)
    expect(config).to.have.property('validator')
    done()
  })

  it('should throw an error when values do not match when setting the schema', (done) => {
    try {
      const config = new Config()
      config.set('string', new Date())
      config.setSchema(testSchema)
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.a(Config.errors.ValidationError)
      done()
    }
  })

  it('should automatically set schema id when it is missing', (done) => {
    const config = new Config()
    config.setSchema({
      type: testSchema.type,
      properties: testSchema.properties
    })
    expect(config.validator.schemas).to.have.property('/config')
    done()
  })

  it('should validate by the given schema', (done) => {
    try {
      const config = new Config()
      config.setSchema(testSchema)
      config.set('string', [new Date()])
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.a(Config.errors.ValidationError)
      done()
    }
  })

  it('should throw an error when validating before a schema is set', (done) => {
    try {
      const config = new Config()
      config.validateConfig()
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.a(Config.errors.ConfigError)
      done()
    }
  })

  it('should not change the config value when validation fails', (done) => {
    const config = new Config()
    const originalValue = 'original string value'
    config.set('string', originalValue)

    try {
      config.setSchema(testSchema)
      config.set('string', [new Date()])
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.a(Config.errors.ValidationError)
      expect(config.get('string')).to.eql(originalValue)
      done()
    }
  })

  it('should get a singleton instance of validator', (done) => {
    const config = new Config()
    const validator = config.getValidator()
    expect(validator).to.be(config.getValidator())
    done()
  })

  it('should accept a JSON schema as the second constructor argument', (done) => {
    const values = {
      string: 'testValue'
    }

    const config = new Config(values, testSchema)
    expect(config.schema).to.eql(testSchema)
    done()
  })

  it('should be possible to validate the config after it has been set', (done) => {
    const values = {
      string: 'testValue'
    }

    const config = new Config(values, testSchema)
    expect(config.schema).to.eql(testSchema)

    config.validateConfig()
    done()
  })

  it('should validate the options given in the constructor when adding with a schema', (done) => {
    try {
      const values = {
        string: new Date()
      }

      const config = new Config(values, testSchema)
      expect(config.schema).to.eql(testSchema)
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.a(Config.errors.ValidationError)
      done()
    }
  })
})
