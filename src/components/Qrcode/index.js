import PropTypes from 'prop-types'
import Taro, { Component } from '@tarojs/taro'
import { Canvas, View } from '@tarojs/components'
import utils from '../../utils'
import './style.css'

class QRCode extends Component {
  componentDidMount () {
    const ctx = Taro.createCanvasContext('qrcode', this)
    utils.qrcode(this.props.text, {
      ctx,
      size: this.props.size * 2,
      padding: 0,
    })
    ctx.draw()
  }

  render () {
    const style = {
      width: this.props.size * 2 + 'px',
      height: this.props.size * 2 + 'px',
    }

    const wrapStyle = {
      width: this.props.size + 'px',
      height: this.props.size + 'px',
    }

    return (
      <View className='wrap' style={wrapStyle}>
        <Canvas canvasId='qrcode' className='qrcode' style={style}></Canvas>
      </View>
    )
  }
}

QRCode.defaultProps = {
  text: 'HELLO',
  size: 300,
}

QRCode.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
}

export default QRCode
