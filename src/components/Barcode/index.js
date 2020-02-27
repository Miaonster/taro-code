import Taro, { useMemo } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Image } from '@tarojs/components'
import barcode from '../../utils/barcode'

function BarCode({ text, scale, width, height }) {
  const image = useMemo(() => barcode({ text, scale }), [text, scale])
  const widthString = width ? width + 'px' : ''
  const heightString = height ? height + 'px' : ''
  const style = { width: widthString, height: heightString }
  return <Image style={style} src={image} />
}

BarCode.defaultProps = {
  text: '',
  scale: 4,
  width: 300,
  height: 60,
}

BarCode.propTypes = {
  text: PropTypes.string,
  scale: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default BarCode
