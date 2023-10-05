const { expect } = require('chai')
const { argparse } = require('../')

describe('lib/argparse', () => {
  it('should parse basic arguments', () => {
    expect(argparse(['--foo=bar'])).to.eql({ foo: 'bar' })
    expect(argparse(['--foo=bar', '--bar=foo', 'bar=foo'])).to.eql({ foo: 'bar', bar: 'foo' })
  })

  it('should typecast strings', () => {
    expect(argparse(['--foo=true'])).to.eql({ foo: true })
    expect(argparse(['--foo=false'])).to.eql({ foo: false })
    expect(argparse(['--foo=1.2'])).to.eql({ foo: 1.2 })
  })

  it('should parse boolean arguments', () => {
    expect(argparse(['--foo'])).to.eql({ foo: true })
    expect(argparse(['--no-foo'])).to.eql({ foo: false })
  })

  it('should create arrays for multiple of the same argument', () => {
    expect(argparse(['--foo=bar', '--foo=foo'])).to.eql({ foo: ['bar', 'foo'] })
  })
})
