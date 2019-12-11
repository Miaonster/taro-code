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
        <Barcode text='hello' width={300} height={60} scale={4} />
        <QRCode
          text='world'
          size={300}
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

| Prop     | Type     | Default |
| -------- | -------- | ------- |
| `text`   | `string` | `''`    |
| `width`  | `number` | `300`   |
| `height` | `number` | `80`    |
| `scale`  | `number` | `4`     |

### QRCode

| Prop                | Type     | Default |
| ------------------- | -------- | ------- |
| `text`              | `string` | `''`    |
| `size`              | `number` | `300`   |
| `scale`             | `number` | `4`     |
| `typeNumber`        | `number` | `2`     |
| `errorCorrectLevel` | `string` | `'M'`   |
