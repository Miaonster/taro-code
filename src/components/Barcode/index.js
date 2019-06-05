import PropTypes from 'prop-types'
import Taro, { Component } from '@tarojs/taro'
import { Canvas, View } from '@tarojs/components'
import utils from '../../utils'
import './style.css'

class Barcode extends Component {
  componentDidMount () {
    const ctx = Taro.createCanvasContext('barcode', this)

    utils.barcode({
      ctx,
      text: this.props.text,
      width: this.props.width * 4,
      height: this.props.height * 4,
    })
  }

  render () {
    const style = {
      width: this.props.width * 4 + 'px',
      height: this.props.height * 4 + 'px',
    }

    const wrapStyle = {
      width: this.props.width + 'px',
      height: this.props.height + 'px',
    }

    return (
      <View className='wrap' style={wrapStyle}>
        <Canvas canvasId='barcode' className='barcode' style={style}></Canvas>
      </View>
    )
  }
}

Barcode.defaultProps = {
  text: 'HELLO',
  width: 375,
  height: 80,
}

Barcode.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Barcode
