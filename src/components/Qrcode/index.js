import PropTypes from 'prop-types'
import Taro, { Component } from '@tarojs/taro'
import { Canvas, View } from '@tarojs/components'
import utils from '../../utils'
import './style.css'

class QRCode extends Component {
  componentDidMount () {
    this.drawCode(this.props.text)
  }

  componentWillReceiveProps (nextProps) {
    this.drawCode(nextProps.text)
  }

  drawCode (text) {
    const ctx = Taro.createCanvasContext('qrcode', this)
    utils.qrcode(text, {
      ctx,
      size: this.props.size,
      padding: 0,
    })
    ctx.draw()
  }

  render () {
    const { size, text } = this.props
    const style = {
      width: size + 'px',
      height: size + 'px',
    }

    const wrapStyle = {
      width: size + 'px',
      height: size + 'px',
    }

    return (
      <View className='wrap' style={wrapStyle}>
        {text && <Canvas canvasId='qrcode' className='qrcode' style={style}></Canvas>}
      </View>
    )
  }
}

QRCode.defaultProps = {
  text: '',
  size: 300,
}

QRCode.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
}

export default QRCode
