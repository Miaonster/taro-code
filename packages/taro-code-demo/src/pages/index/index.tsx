import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { Barcode, QRCode } from 'taro-code'
import './index.css'

class Index extends Component {
  state = {
    text: 'hello',
    size: 300
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        text: Date.now() + '',
        size: Math.floor(Math.random() * (300 - 200) + 200)
      })
    }, 2000)
  }

  render () {
    return (
      <View className='index'>
        <View className='barcode'>
          <Barcode text={this.state.text} style={{ width: this.state.size + 'px' }} height={60} />
        </View>
        <View className='qrcode'>
          <QRCode text={this.state.text} size={this.state.size} />
        </View>
      </View>
    )
  }
}

export default Index
