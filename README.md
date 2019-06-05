Taro Code
=========

> QRCode & Barcode component for [Taro.js](https://taro.js.org), inspired by [wx-mini-qrcode](https://github.com/flyingsouthwind/wx-mini-qrcode) and [wxbarcode](https://github.com/alsey/wxbarcode).

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
  render () {
    return (
      <View>
        <Barcode text='hello' width={305} height={68} />
        <QRCode text='world' size={130} />
      </View>
    )
  }
}
```

## Props

### Barcode

#### text

* Type: `string`
* Default: `'HELLO'`

#### width

* Type: `number`
* Default: `375`

#### height

* Type: `number`
* Default: `80`

### QRCode

#### text

* Type: `string`
* Default: `'HELLO'`

#### size

* Type: `number`
* Default: `375`
