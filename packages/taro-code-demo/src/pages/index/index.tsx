import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Barcode, QRCode } from '../../../../taro-code/lib'
import './index.css'

const Index: React.FC = () => {
  const [text, setText] = useState('hello')
  const [size, setSize] = useState(300)
  const [foregroundColor] = useState('#F00000')
  const [backgroundColor] = useState('#FFFFFF')

  useEffect(() => {
    const timer = setInterval(() => {
      setText(`${Date.now()}`)
      setSize(Math.floor(Math.random() * (300 - 200) + 200))
    }, 2000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <View className='index'>
      <View className='barcode'>
        <Barcode
          text={text}
          width={size}
          height={60}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
        />
      </View>
      <View className='qrcode'>
        <QRCode
          text={text}
          size={size}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
        />
      </View>
    </View>
  )
}

export default Index
