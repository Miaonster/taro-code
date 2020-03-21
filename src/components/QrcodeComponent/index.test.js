/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import Nerv from 'nervjs'
import { renderToString } from 'nerv-server'
import QRCode from '../../../.temp/components/QrcodeComponent'

describe('QRCode test', () => {
  it('hello world', () => {
    const component = renderToString(<QRCode text='hello world' />)
    expect(component).toMatchSnapshot()
  })
  it('40+ words', () => {
    const component = renderToString(
      <QRCode text='12345678901234567890123456789012345678901234567890' />,
    )
    expect(component).toMatchSnapshot()
  })
})
