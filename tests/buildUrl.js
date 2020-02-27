const expect = require('expect.js')
const buildUrl = require('../lib/buildUrl')

describe('buildUrl', () => {
  it('should throw an error without a protocol', (done) => {
    expect(buildUrl).withArgs(null, 'localhost').to.throwError()
    done()
  })

  it('should throw an error without a host', (done) => {
    expect(buildUrl).withArgs('ssl').to.throwError()
    done()
  })

  it('should return a URL for all arguments', (done) => {
    expect(buildUrl('http', 'localhost', 3001, 'tester', 'testing', '/resource', { foo: 'bar' }))
      .to.be('http://tester:testing@localhost:3001/resource?foo=bar')
    done()
  })

  it('should return a URL for all arguments but password', (done) => {
    expect(buildUrl('http', 'localhost', 3001, 'tester', null, '/resource'))
      .to.be('http://tester@localhost:3001/resource')
    done()
  })

  it('should return a URL for all arguments but port', (done) => {
    expect(buildUrl('http', 'localhost', null, 'tester', 'testing', '/resource'))
      .to.be('http://tester:testing@localhost/resource')
    done()
  })

  it('should return a URL for all arguments but location', (done) => {
    expect(buildUrl('http', 'localhost', 1234, 'tester', 'testing'))
      .to.be('http://tester:testing@localhost:1234')
    done()
  })

  it('should add leading / to location', (done) => {
    const options = {
      port: 80,
      host: 'example.net',
      location: 'foobar'
    }
    expect(buildUrl(options)).to.be('http://example.net/foobar')
    done()
  })

  it('should return a URL for an object argument', (done) => {
    const options = {
      protocol: 'postgresql',
      host: 'localhost',
      username: 'postgres',
      location: 'test-db',
      query: {
        use_ssl: true
      }
    }

    expect(buildUrl(options)).to.be('postgresql://postgres@localhost/test-db?use_ssl=true')
    done()
  })

  it('should escape username and password', (done) => {
    const options = {
      protocol: 'postgresql',
      host: 'localhost',
      username: '#',
      password: '%&/()',
      location: 'test-db'
    }

    expect(buildUrl(options)).to.be('postgresql://%23:%25%26%2F()@localhost/test-db')
    done()
  })

  it('should omit port 80 for HTTP', (done) => {
    const options = {
      protocol: 'http',
      host: 'localhost',
      port: 80,
      location: 'test'
    }

    expect(buildUrl(options)).to.be('http://localhost/test')
    done()
  })

  it('should omit port 443 for HTTPS', (done) => {
    const options = {
      protocol: 'https',
      host: 'localhost',
      port: 443,
      location: 'test'
    }

    expect(buildUrl(options)).to.be('https://localhost/test')
    done()
  })

  it('should convert HTTP to HTTPS on port 443', (done) => {
    const options = {
      protocol: 'http',
      host: 'localhost',
      port: 443,
      location: 'test'
    }

    expect(buildUrl(options)).to.be('https://localhost/test')
    done()
  })
})
