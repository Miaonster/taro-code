import React from 'react'
import renderer from 'react-test-renderer'
import BarcodeCanvas from './index'

describe('BarcodeCanvas test', () => {
  it('renders correctly with hello world', () => {
    const tree = renderer.create(<BarcodeCanvas text='hello world' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with 40+ words', () => {
    const tree = renderer.create(<BarcodeCanvas text='12345678901234567890123456789012345678901234567890' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
