import Taro, { useState, useEffect } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Image } from '@tarojs/components'
import { createQrCodeImg } from 'wx-base64-qrcode'

function QRCode({ text, size, scale, typeNumber, errorCorrectLevel }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (text) {
      const options = { errorCorrectLevel, typeNumber, size: size * scale }
      setImage(createQrCodeImg(text, options))
    } else {
      setImage('')
    }
  }, [text])

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
