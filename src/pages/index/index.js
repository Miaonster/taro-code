import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Barcode from '@/components/Barcode';
import Qrcode from '@/components/Qrcode';
import './index.css'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Barcode text='hello' width={320} />
        <Qrcode text='hello' />
      </View>
    )
  }
}
