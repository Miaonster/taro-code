import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import QRCode from './index'

describe('QRCode test', () => {
  it('hello world', () => {
    const wrapper = shallow(<QRCode text='hello world' />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('40+ words', () => {
    const wrapper = shallow(
      <QRCode text='12345678901234567890123456789012345678901234567890' />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
