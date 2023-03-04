const { expect } = require('chai')
const { Config } = require('../../')

describe('lib/Config:jsonschema', () => {
  const testSchema = {
    $id: '/#/test/config',
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
    expect(() => config.setSchema('foo')).to.throw()
    expect(() => config.setSchema(['foo'])).to.throw()
    expect(() => config.setSchema([''])).to.throw()
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
      expect(err).to.be.an.instanceof(Config.errors.ValidationError)
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
      expect(err).to.be.an.instanceof(Config.errors.ValidationError)
      done()
    }
  })

  it('should throw an error when validating before a schema is set', (done) => {
    try {
      const config = new Config()
      config.validate()
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.an.instanceof(Config.errors.ConfigError)
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
      expect(err).to.be.an.instanceof(Config.errors.ValidationError)
      expect(config.get('string')).to.eql(originalValue)
      done()
    }
  })

  it('should get a singleton instance of validator', (done) => {
    const config = new Config()
    const validator = config.getValidator()
    expect(validator).to.equal(config.getValidator())
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

    config.validate()
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
      expect(err).to.be.an.instanceof(Config.errors.ValidationError)
      done()
    }
  })

  it('should reject invalid values in a referenced schema', (done) => {
    try {
      const referred = {
        $id: 'https://example.com/schemas#/test/referred',
        type: 'object',
        properties: {
          referredNumber: {
            type: 'number'
          }
        }
      }

      const schema = {
        $id: 'https://example.com/schemas#/test/config',
        type: 'object',
        properties: {
          referred: {
            $ref: '#/test/referred'
          }
        }
      }

      const config = new Config()
      config.addSchema(referred)
      config.setSchema(schema)

      config.set('referred.referredNumber', 'foobar')
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.an.instanceof(Config.errors.ValidationError)
      done()
    }
  })

  it('should validate values in a deep referenced schema', (done) => {
    const deepReferred = {
      $id: 'https://example.com/schemas#/test/deep-referred',
      type: 'object',
      properties: {
        deepReferredNumber: {
          type: 'number'
        }
      }
    }

    const referred = {
      $id: 'https://example.com/schemas#/test/referred',
      type: 'object',
      properties: {
        referredString: {
          type: 'string'
        },
        deepReferred: {
          $ref: '#/test/deep-referred'
        }
      }
    }

    const schema = {
      $id: 'https://example.com/schemas#/test/config',
      type: 'object',
      properties: {
        referred: {
          $ref: '#/test/referred'
        }
      }
    }

    const config = new Config()
    config.addSchema(referred)
    config.addSchema(deepReferred)
    config.setSchema(schema)

    config.set('referred.deepReferred.deepReferredNumber', 123)
    done()
  })

  it('should reject invalid values in a deep referenced schema', (done) => {
    try {
      const deepReferred = {
        $id: 'https://example.com/schemas#/test/deep-referred',
        type: 'object',
        properties: {
          deepReferredNumber: {
            type: 'number'
          }
        }
      }

      const referred = {
        $id: 'https://example.com/schemas#/test/referred',
        type: 'object',
        properties: {
          referredString: {
            type: 'string'
          },
          deepReferred: {
            $ref: '#/test/deep-referred'
          }
        }
      }

      const schema = {
        $id: 'https://example.com/schemas#/test/config',
        type: 'object',
        properties: {
          referred: {
            $ref: '#/test/referred'
          }
        }
      }

      const config = new Config()
      config.addSchema(referred)
      config.addSchema(deepReferred)
      config.setSchema(schema)

      config.set('referred.deepReferred.deepReferredNumber', 'foobar')
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.an.instanceof(Config.errors.ValidationError)
      done()
    }
  })

  it('should traverse the schema to set the default values', (done) => {
    const defaultString = 'test-default-string'
    const defaultObjectString = 'test-default-object-string'

    const schema = {
      $id: '/#/test/config',
      type: 'object',
      properties: {
        string: {
          type: 'string',
          default: defaultString
        },
        object: {
          type: 'object',
          properties: {
            objectString: {
              type: 'string',
              default: defaultObjectString
            }
          }
        }
      }
    }

    const config = new Config()
    config.setSchema(schema)
    expect(config.get('string')).to.eql(defaultString)
    expect(config.get('object.objectString')).to.eql(defaultObjectString)
    done()
  })

  it('should not set default values when there is a non-null value', (done) => {
    const defaultString = 'test-default-string'
    const givenString = 'test-given-string'
    const defaultObjectString = 'test-default-object-string'

    const schema = {
      $id: '/#/test/config',
      type: 'object',
      properties: {
        string: {
          type: 'string',
          default: defaultString
        },
        booleanIsDefined: {
          type: 'boolean',
          default: true
        },
        object: {
          type: 'object',
          properties: {
            objectString: {
              type: 'string',
              default: defaultObjectString
            }
          }
        }
      }
    }

    const config = new Config({ string: givenString, booleanIsDefined: false }, schema)
    expect(givenString).not.to.eql(defaultString)
    expect(config.get('string')).to.eql(givenString)
    expect(config.get('booleanIsDefined')).to.eql(false)
    expect(config.get('object.objectString')).to.eql(defaultObjectString)
    done()
  })

  it('should set referred schema defaults', (done) => {
    const referredStringValue = 'referred-string-value'

    const referred = {
      $id: 'https://example.com/schemas#/test/referred',
      type: 'object',
      properties: {
        referredString: {
          type: 'string',
          default: referredStringValue
        }
      }
    }

    const schema = {
      $id: 'https://example.com/schemas#/test/config',
      type: 'object',
      properties: {
        referred: {
          $ref: '#/test/referred'
        }
      }
    }

    const config = new Config()
    config.addSchema(referred)
    config.setSchema(schema)

    expect(config.get('referred.referredString')).to.eql(referredStringValue)
    done()
  })

  it('should set deep referred schema defaults', (done) => {
    const referredStringValue = 'referred-string-value'
    const deepReferredStringValue = 'deep-referred-string-value'

    const deepReferred = {
      $id: 'https://example.com/schemas#/test/deep-referred',
      type: 'object',
      properties: {
        deepReferredString: {
          type: 'string',
          default: deepReferredStringValue
        }
      }
    }

    const referred = {
      $id: 'https://example.com/schemas#/test/referred',
      type: 'object',
      properties: {
        referredString: {
          type: 'string',
          default: referredStringValue
        },
        deepReferred: {
          $ref: '#/test/deep-referred'
        }
      }
    }

    const schema = {
      $id: 'https://example.com/schemas#/test/config',
      type: 'object',
      properties: {
        referred: {
          $ref: '#/test/referred'
        }
      }
    }

    const config = new Config()
    config.addSchema(referred)
    config.addSchema(deepReferred)
    config.setSchema(schema)

    expect(config.get('referred.referredString')).to.eql(referredStringValue)
    expect(config.get('referred.deepReferred.deepReferredString')).to.eql(deepReferredStringValue)
    done()
  })

  it('should accept using $defs', (done) => {
    const schema = {
      type: 'object',
      properties: {
        referencing: {
          $ref: '#/$defs/referenced'
        }
      },
      $defs: {
        referenced: {
          type: 'string'
        }
      }
    }

    const config = new Config()
    config.setSchema(schema)
    config.set('referencing', 'foo')

    try {
      config.set('referencing', 1)
      throw new Error('Should have thrown a ValidationError')
    } catch (err) {
      expect(err).to.be.an.instanceof(Config.errors.ValidationError)
    }

    done()
  })
})
