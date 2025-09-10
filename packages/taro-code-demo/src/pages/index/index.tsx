import { Button, Canvas, Input, View } from '@tarojs/components'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Barcode, BarcodeCanvas, QRCode, QRCodeCanvas } from 'taro-code'
import './index.css'

// 自定义滑块组件
const CustomSlider: React.FC<{
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  title: string
}> = ({ min, max, value, onChange, title }) => {
  const sliderRef = useRef<any>(null)
  const [isDragging, setIsDragging] = useState(false)

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      const slider = sliderRef.current
      if (!slider) return value

      const rect = slider.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      return Math.round(min + percent * (max - min))
    },
    [min, max, value],
  )

  // 触摸事件处理
  const handleTouchStart = (e: any) => {
    setIsDragging(true)
    const touch = e.touches?.[0] || e.changedTouches?.[0]
    if (!touch) return

    const clientX = touch.clientX || touch.pageX || 0
    const newValue = getValueFromPosition(clientX)
    onChange(newValue)

    e.preventDefault()
    e.stopPropagation()
  }

  const handleTouchMove = (e: any) => {
    if (!isDragging) return

    const touch = e.touches?.[0] || e.changedTouches?.[0]
    if (!touch) return

    const clientX = touch.clientX || touch.pageX || 0
    const newValue = getValueFromPosition(clientX)
    onChange(newValue)

    e.preventDefault()
    e.stopPropagation()
  }

  const handleTouchEnd = (e: any) => {
    setIsDragging(false)

    e.preventDefault()
    e.stopPropagation()
  }

  // 全局鼠标事件处理，用于处理鼠标移出滑块区域的情况
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      console.log('handleGlobalMouseMove', isDragging)
      if (!isDragging) return
      const newValue = getValueFromPosition(e.clientX)
      onChange(newValue)
    }
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        console.log('handleGlobalMouseUp', isDragging)
        setIsDragging(false)
      }
    }
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      const newValue = getValueFromPosition(e.clientX)
      onChange(newValue)
      e.stopPropagation()
    }
    const slider = sliderRef.current
    if (slider) {
      sliderRef.current.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }
    return () => {
      slider.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, onChange, getValueFromPosition])

  const percent = (value - min) / (max - min)

  return (
    <View className='control-section'>
      <View className='control-title'>
        {title}: {value}px
      </View>
      <View
        ref={sliderRef}
        className={`custom-slider ${isDragging ? 'dragging' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <View className='slider-track'>
          <View className='slider-progress' style={{ width: `${percent * 100}%` }} />
          <View className={`slider-handle ${isDragging ? 'dragging' : ''}`} style={{ left: `${percent * 100}%` }} />
        </View>
      </View>
    </View>
  )
}

const Index: React.FC = () => {
  const [text, setText] = useState('Hello Taro Code!')
  const [size, setSize] = useState(250)
  console.log('size', size)
  const [padding, setPadding] = useState(20)
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')

  const barcodeRef = useRef(null)
  const qrcodeRef = useRef(null)

  const generateRandomValues = () => {
    const randomTexts = [
      'Hello World!',
      'Taro Code Demo',
      'QR Code Generator',
      'Scan me!',
      'https://github.com/Miaonster/taro-code',
      'Made with Taro',
      'React Native',
      'WeChat MiniProgram',
      'Cross Platform',
      'JavaScript Framework',
      'TypeScript Support',
      'Mobile Development',
      'Web Development',
      'Open Source',
      'MIT License',
      '2024 Taro Community',
      'Build Once Run Everywhere',
      'Component Library',
      'Hot Reload',
      'Developer Tools',
    ]
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)]
    setText(randomText)
    setSize(Math.floor(Math.random() * (400 - 150) + 150))
    setPadding(Math.floor(Math.random() * (50 - 0) + 0))
  }

  const generateRandomColors = () => {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF', '#000000', '#F33F33']
    const bgColors = ['#FFFFFF', '#F0F0F0', '#FFFFCC', '#CCFFFF', '#FFCCFF', '#CCFFCC']
    setForegroundColor(colors[Math.floor(Math.random() * colors.length)])
    setBackgroundColor(bgColors[Math.floor(Math.random() * bgColors.length)])
  }

  return (
    <View className='index'>
      <Canvas type='2d' style={{ width: 0, height: 0 }} />

      {/* 左侧控制面板 */}
      <View className='sidebar'>
        <View className='sidebar-header'>
          <View className='title'>Taro Code Demo</View>
          <View className='subtitle'>二维码与条形码生成器</View>
        </View>

        <View className='control-panel'>
          <View className='control-section'>
            <View className='control-title'>📝 文本内容</View>
            <Input
              className='text-input'
              value={text}
              onInput={(e) => {
                const value = e?.detail?.value || ''
                setText(value)
              }}
              placeholder='请输入要编码的文本'
            />
          </View>

          <CustomSlider min={100} max={400} value={size} onChange={setSize} title='📏 尺寸' />

          <CustomSlider min={0} max={50} value={padding} onChange={setPadding} title='📐 边距' />

          <View className='color-controls'>
            <View className='color-group'>
              <View className='control-title'>🎨 前景色</View>
              <View className='color-input-group'>
                <View className='color-preview' style={{ backgroundColor: foregroundColor }}></View>
                <Input
                  className='color-input'
                  value={foregroundColor}
                  onInput={(e) => {
                    const value = e?.detail?.value || ''
                    setForegroundColor(value)
                  }}
                  placeholder='#000000'
                />
              </View>
            </View>

            <View className='color-group'>
              <View className='control-title'>🎯 背景色</View>
              <View className='color-input-group'>
                <View className='color-preview' style={{ backgroundColor: backgroundColor }}></View>
                <Input
                  className='color-input'
                  value={backgroundColor}
                  onInput={(e) => {
                    const value = e?.detail?.value || ''
                    setBackgroundColor(value)
                  }}
                  placeholder='#FFFFFF'
                />
              </View>
            </View>
          </View>

          <View className='control-buttons'>
            <Button className='control-btn primary' onClick={generateRandomValues}>
              🎲 随机内容
            </Button>
            <Button className='control-btn secondary' onClick={generateRandomColors}>
              🌈 随机颜色
            </Button>
          </View>
        </View>
      </View>

      {/* 右侧展示区域 */}
      <View className='main-content'>
        <View className='code-grid'>
          <View className='code-item'>
            <View className='code-header'>
              <View className='code-title'>📊 Barcode Canvas</View>
              <View className='code-badge'>Canvas</View>
            </View>
            <View className='code-container'>
              <BarcodeCanvas
                ref={barcodeRef}
                text={text}
                width={Math.min(size, 350)}
                height={60}
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
              />
            </View>
          </View>

          <View className='code-item'>
            <View className='code-header'>
              <View className='code-title'>📊 Barcode Image</View>
              <View className='code-badge'>Image</View>
            </View>
            <View className='code-container'>
              <Barcode
                ref={barcodeRef}
                text={text}
                width={Math.min(size, 350)}
                height={60}
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
                showMenuByLongpress
              />
            </View>
          </View>

          <View className='code-item'>
            <View className='code-header'>
              <View className='code-title'>📱 QRCode Canvas</View>
              <View className='code-badge'>Canvas</View>
            </View>
            <View className='code-container'>
              <QRCodeCanvas
                ref={qrcodeRef}
                text={text}
                size={Math.min(size, 300)}
                padding={padding}
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
              />
            </View>
          </View>

          <View className='code-item'>
            <View className='code-header'>
              <View className='code-title'>📱 QRCode Image</View>
              <View className='code-badge'>Image</View>
            </View>
            <View className='code-container'>
              <QRCode
                ref={qrcodeRef}
                text={text}
                size={Math.min(size, 300)}
                padding={padding}
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
                showMenuByLongpress
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
