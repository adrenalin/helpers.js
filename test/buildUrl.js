const { expect } = require('chai')
const { buildUrl } = require('../')

describe('lib/buildUrl', () => {
  it('should throw an error without a protocol', () => {
    expect(() => buildUrl(null, 'localhost')).to.throw()
  })

  it('should throw an error without a host', () => {
    expect(() => buildUrl('ssl')).to.throw()
  })

  it('should return a URL for all arguments', () => {
    expect(buildUrl('http', 'localhost', 3001, 'tester', 'testing', '/resource', { foo: 'bar' }))
      .to.equal('http://tester:testing@localhost:3001/resource?foo=bar')
  })

  it('should return a URL for all arguments but password', () => {
    expect(buildUrl('http', 'localhost', 3001, 'tester', null, '/resource'))
      .to.equal('http://tester@localhost:3001/resource')
  })

  it('should return a URL for all arguments but port', () => {
    expect(buildUrl('http', 'localhost', null, 'tester', 'testing', '/resource'))
      .to.equal('http://tester:testing@localhost/resource')
  })

  it('should return a URL for all arguments but location', () => {
    expect(buildUrl('http', 'localhost', 1234, 'tester', 'testing'))
      .to.equal('http://tester:testing@localhost:1234')
  })

  it('should add leading / to location', () => {
    const options = {
      port: 80,
      host: 'example.net',
      location: 'foobar'
    }
    expect(buildUrl(options)).to.equal('http://example.net/foobar')
  })

  it('should return a URL for an object argument', () => {
    const options = {
      protocol: 'postgresql',
      host: 'localhost',
      username: 'postgres',
      location: 'test-db',
      query: {
        use_ssl: true
      }
    }

    expect(buildUrl(options)).to.equal('postgresql://postgres@localhost/test-db?use_ssl=true')
  })

  it('should escape username and password', () => {
    const options = {
      protocol: 'postgresql',
      host: 'localhost',
      username: '#',
      password: '%&/()',
      location: 'test-db'
    }

    expect(buildUrl(options)).to.equal('postgresql://%23:%25%26%2F()@localhost/test-db')
  })

  it('should omit port 80 for HTTP', () => {
    const options = {
      protocol: 'http',
      host: 'localhost',
      port: 80,
      location: 'test'
    }

    expect(buildUrl(options)).to.equal('http://localhost/test')
  })

  it('should omit port 443 for HTTPS', () => {
    const options = {
      protocol: 'https',
      host: 'localhost',
      port: 443,
      location: 'test'
    }

    expect(buildUrl(options)).to.equal('https://localhost/test')
  })

  it('should convert HTTP to HTTPS on port 443', () => {
    const options = {
      protocol: 'http',
      host: 'localhost',
      port: 443,
      location: 'test'
    }

    expect(buildUrl(options)).to.equal('https://localhost/test')
  })

  it('should get the missing protocol, host, port, username and password from location', () => {
    expect(buildUrl({ location: 'http://localhost/foo/bar' })).to.equal('http://localhost/foo/bar')
    expect(buildUrl({ password: 'bar', location: 'http://foo@localhost/foo/bar' })).to.equal('http://foo:bar@localhost/foo/bar')
    expect(buildUrl({ location: 'http://localhost:8080/foo/bar' })).to.equal('http://localhost:8080/foo/bar')
    expect(buildUrl({ location: 'http://example.net/foo/bar' })).to.equal('http://example.net/foo/bar')
    // expect(buildUrl({ port: 8080, location: 'http://localhost/foo/bar' })).to.equal('http://localhost:8080/foo/bar')
  })

  it('should overwrite host, port, username and password from location when explicitly defined', () => {
    expect(buildUrl({ host: 'localhost', location: 'http://example.net/foo/bar' })).to.equal('http://localhost/foo/bar')
    expect(buildUrl({ port: 8080, location: 'http://example.net:8000/foo/bar' })).to.equal('http://example.net:8080/foo/bar')
    expect(buildUrl({ port: null, location: 'http://example.net:8000/foo/bar' })).to.equal('http://example.net/foo/bar')
    expect(buildUrl({ username: null, password: null, location: 'http://foo:bar@example.net:8000/foo/bar' })).to.equal('http://example.net:8000/foo/bar')
  })
})
