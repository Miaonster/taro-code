/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import TestRenderer from 'react-test-renderer'
import { QRCode } from '../../../dist'

describe('QRCode test', () => {
  it('hello world', () => {
    const component = TestRenderer.create(<QRCode text='hello world' />)
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('40+ words', () => {
    const component = TestRenderer.create(
      <QRCode text='12345678901234567890123456789012345678901234567890' />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
