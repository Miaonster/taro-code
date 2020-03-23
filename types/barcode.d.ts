import React from 'react'

export interface BarcodeProps {
  text: string
  scale?: number
  width?: number
  height?: number
}

declare const Barcode: React.SFC<BarcodeProps>
