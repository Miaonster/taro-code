import React, { CSSProperties, useMemo } from 'react'
import { Image } from '@tarojs/components'
import barcode from '../../common/barcode'

const Barcode: React.FC<{
  className?: string
  text: string
  scale?: number
  width?: number
  height?: number
  style?: CSSProperties
  foregroundColor?: string
  backgroundColor?: string
}> = ({
  className,
  text = '',
  scale = 4,
  width = 300,
  height = 60,
  style = {},
  foregroundColor = '#000000',
  backgroundColor = '#FFFFFF'
}) => {
  const image = useMemo(
    () =>
      barcode({
        text,
        scale,
        whiteColor: backgroundColor,
        blackColor: foregroundColor
      }),
    [text, scale, backgroundColor, foregroundColor]
  )
  const widthString = width != null ? `${width}px` : ''
  const heightString = height != null ? `${height}px` : ''
  const finalStyle = { width: widthString, height: heightString, ...style }
  return <Image className={className} style={finalStyle} src={image ?? ''} />
}

export default Barcode
