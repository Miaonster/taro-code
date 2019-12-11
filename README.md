# Taro Code

> QRCode & Barcode component for [Taro.js](https://taro.js.org), inspired by [wx-base64-qrcode](https://github.com/PsChina/wx-base64-qrcode) and [wxbarcode](https://github.com/alsey/wxbarcode). Components will generate base64 qrcode/barcode image.

## Getting Started

### Install

```
yarn add taro-code
# or
npm install taro-code
```

### Usage

```jsx
import Taro from '@tarojs/taro'
import { Barcode, QRCode } from 'taro-code'

class Code extends Taro.Component {
  render() {
    return (
      <View>
        <Barcode text='hello' width={305} height={68} scale={4} />
        <QRCode
          text='world'
          size={130}
          scale={4}
          errorCorrectLevel='M'
          typeNumber={2}
        />
      </View>
    )
  }
}
```

## Props

### Barcode

#### text

- Type: `string`
- Default: `''`

#### width

- Type: `number`
- Default: `300`

#### height

- Type: `number`
- Default: `80`

#### scale

- Type: `number`
- Default: `4`

### QRCode

#### text

- Type: `string`
- Default: `''`

#### size

- Type: `number`
- Default: `300`

#### scale

- Type: `number`
- Default: `4`

#### typeNumber

- Type: `number`
- Default: `2`

#### errorCorrectLevel

- Type: `string`
- Default: `'M'`
