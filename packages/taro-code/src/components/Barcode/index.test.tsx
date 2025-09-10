import React from 'react'
import renderer from 'react-test-renderer'
import Barcode from './index'

describe('Barcode test', () => {
  it('renders correctly with hello world', () => {
    const tree = renderer.create(<Barcode text='hello world' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
