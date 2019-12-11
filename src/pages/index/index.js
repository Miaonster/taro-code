import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Barcode from '../../components/Barcode'
import QRCode from '../../components/QRCode'
import './index.css'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  state = {
    text: 'hello',
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        text: Date.now() + '',
      })
    }, 1000)
  }

  render() {
    return (
      <View className='index'>
        <View className='barcode'>
          <Barcode text={this.state.text} width={300} height={60} />
        </View>
        <View className='qrcode'>
          <QRCode text={this.state.text} size={300} />
        </View>
      </View>
    )
  }
}
