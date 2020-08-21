import React from 'react'

export interface QRCodeProps {
  text: string
  scale?: number
  size?: number
  /**
   * version
   * @default 2
   * @see https://www.qrcode.com/zh/about/version.html
   */
  typeNumber?: number
  errorCorrectLevel?: 'L' | 'M' | 'Q' | 'H'
}

declare const QRCode: React.SFC<QRCodeProps>
