import Taro, { useState, useEffect } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Image } from '@tarojs/components'
import utils from '@/utils'

function BarCode({ text, scale, width, height }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (text) {
      setImage(utils.barcode({ text, scale }))
    } else {
      setImage('')
    }
  }, [text])

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
