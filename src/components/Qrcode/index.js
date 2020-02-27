import Taro, { useMemo } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Image } from '@tarojs/components'
import { createQrCodeImg } from '../../utils/qrcode'

function QRCode({ text, size, scale, typeNumber, errorCorrectLevel }) {
  const image = useMemo(() => {
    const options = { errorCorrectLevel, typeNumber, size: size * scale }
    return createQrCodeImg(text, options)
  }, [text, scale, size, errorCorrectLevel, typeNumber])
  const style = { width: size + 'px', height: size + 'px' }
  return <Image style={style} src={image} />
}

QRCode.defaultProps = {
  text: '',
  size: 100,
  scale: 4,
  errorCorrectLevel: 'M',
  typeNumber: 2,
}

QRCode.propTypes = {
  size: PropTypes.number,
  scale: PropTypes.number,
  text: PropTypes.string,
  errorCorrectLevel: PropTypes.string,
  typeNumber: PropTypes.number,
}

export default QRCode
