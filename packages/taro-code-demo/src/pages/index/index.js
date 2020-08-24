import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { Barcode, QRCode } from 'taro-code'
import './index.css'

class Index extends Component {
  state = {
    text: 'hello'
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        text: Date.now() + ''
      })
    }, 1000)
  }

  render () {
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

export default Index
