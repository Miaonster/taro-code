import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Barcode from './index'

describe('Barcode test', () => {
  it('Barcode test suites', () => {
    const wrapper = shallow(<Barcode text='hello world' />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
