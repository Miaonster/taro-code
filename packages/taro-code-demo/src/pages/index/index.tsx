import React, { useEffect, useRef, useState } from 'react'
import { View, Canvas } from '@tarojs/components'
// import Barcode from 'taro-code/lib/components/Barcode'
// import QRCode from 'taro-code/lib/components/QRCode'
// import QRCodeCanvas from 'taro-code/lib/components/QRCodeCanvas'
import { Barcode, QRCode, QRCodeCanvas, BarcodeCanvas } from 'taro-code'
import './index.css'

const Index: React.FC = () => {
  const [text, setText] = useState('1')
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

  const barcodeRef = useRef(null)
  const qrcodeRef = useRef(null)

  return (
    <View className='index'>
      <Canvas type='2d' style={{ width: 0, height: 0 }} />
      <View className='barcode'>
        <View className='caption'>Barcode Canvas</View>
        <BarcodeCanvas
          ref={barcodeRef}
          text={text}
          width={size}
          height={60}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
        />
      </View>
      <View className='barcode'>
        <View className='caption'>Barcode Image</View>
        <Barcode
          ref={barcodeRef}
          text={text}
          width={size}
          height={60}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          showMenuByLongpress
        />
      </View>
      <View className='qrcode'>
        <View className='caption'>QRCode Canvas</View>
        <QRCodeCanvas
          ref={qrcodeRef}
          text={text}
          size={size}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          padding={10}
        />
      </View>
      <View className='qrcode'>
        <View className='caption'>QRCode Image</View>
        <QRCode
          ref={qrcodeRef}
          text={text}
          size={size}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          showMenuByLongpress
        />
      </View>
    </View>
  )
}

export default Index
