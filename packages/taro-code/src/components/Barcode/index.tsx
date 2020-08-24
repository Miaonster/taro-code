import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Image } from '@tarojs/components'
import barcode from '../../common/barcode'

const Barcode = ({ text = '', scale = 4, width = 300, height = 60, style = {} }) => {
  const image = useMemo(() => barcode({ text, scale }), [text, scale])
  const widthString = width ? width + 'px' : ''
  const heightString = height ? height + 'px' : ''
  const finalStyle = { width: widthString, height: heightString, ...style }
  return <Image style={finalStyle} src={image || ''} />
}

Barcode.propTypes = {
  text: PropTypes.string.isRequired,
  scale: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
}

export default Barcode
