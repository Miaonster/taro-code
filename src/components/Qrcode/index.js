import PropTypes from 'prop-types'
import Taro, { Component } from '@tarojs/taro'
import { Canvas, View } from '@tarojs/components'
import utils from '@/utils'
import './style.css'

class Qrcode extends Component {
  componentDidMount () {
    const ctx = Taro.createCanvasContext('qrcode', this)

    utils.qrcode({
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
        <Canvas canvasId='qrcode' className='qrcode' style={style}></Canvas>
      </View>
    )
  }
}

Qrcode.defaultProps = {
  text: '',
  width: 300,
  height: 300,
}

Qrcode.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Qrcode
