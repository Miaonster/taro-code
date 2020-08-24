import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Image } from '@tarojs/components'
import { createQrCodeImg } from '../../common/qrcode'

const QRCode = ({ text = '', size = 100, scale = 4, typeNumber = 2, errorCorrectLevel = 'M', style = {} }) => {
  const image = useMemo(() => {
    const options = { errorCorrectLevel, typeNumber, size: size * scale }
    return createQrCodeImg(text, options)
  }, [text, scale, size, errorCorrectLevel, typeNumber])
  const widthString = size ? size + 'px' : ''
  const heightString = size ? size + 'px' : ''
  const finalStyle = { width: widthString, height: heightString, ...style }
  return <Image style={finalStyle} src={image} />
}

QRCode.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  scale: PropTypes.number,
  style: PropTypes.object,
  errorCorrectLevel: PropTypes.string,
  typeNumber: PropTypes.number
}

export default QRCode
