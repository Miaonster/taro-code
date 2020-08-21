import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Image } from '@tarojs/components'
import { createQrCodeImg } from '../../common/qrcode'

const QRCode = ({ text = '', size = 100, scale = 4, typeNumber = 2, errorCorrectLevel = 'M' }) => {
  const image = useMemo(() => {
    const options = { errorCorrectLevel, typeNumber, size: size * scale }
    return createQrCodeImg(text, options)
  }, [text, scale, size, errorCorrectLevel, typeNumber])
  const style = { width: size + 'px', height: size + 'px' }
  return <Image style={style} src={image} />
}

QRCode.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  scale: PropTypes.number,
  errorCorrectLevel: PropTypes.string,
  typeNumber: PropTypes.number
}

export default QRCode
