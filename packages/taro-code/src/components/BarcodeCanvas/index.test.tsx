import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BarcodeCanvas from './index'

describe('QRCodeCanvas test', () => {
  it('hello world', () => {
    const wrapper = shallow(<BarcodeCanvas text='hello world' />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('40+ words', () => {
    const wrapper = shallow(<BarcodeCanvas text='12345678901234567890123456789012345678901234567890' />)
    expect(wrapper).toMatchSnapshot()
  })
})
