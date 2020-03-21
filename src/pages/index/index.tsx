import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Barcode from '../../components/BarcodeComponent'
import QRCode from '../../components/QrcodeComponent'
import './index.css'

export default class Index extends Component {
  state = {
    text: 'hello',
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        text: Date.now() + '',
      })
    }, 3000)
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
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
        <View>{this.state.text}</View>
      </View>
    )
  }
}
