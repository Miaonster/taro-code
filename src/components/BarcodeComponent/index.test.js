/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import Nerv from 'nervjs'
import { renderToString } from 'nerv-server'
import Barcode from '../../../.temp/components/BarcodeComponent'

describe('Barcode test', () => {
  it('Barcode test suites', () => {
    const component = renderToString(<Barcode text='hello world' />)
    expect(component).toMatchSnapshot()
  })
})
