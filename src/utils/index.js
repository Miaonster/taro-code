import Taro from '@tarojs/taro'
import { code128 } from './barcode';
import qrcode from './qrcode';

function convertLength(length) {
	return Math.round(Taro.getSystemInfoSync().windowWidth * length / 750);
}

function barc({ ctx, text, width, height }) {
	code128(ctx, text, convertLength(width), convertLength(height))
}

function qrc({ ctx, text, width, height }) {
	qrcode.api.draw(text, {
		ctx,
		width: convertLength(width),
		height: convertLength(height)
	})
}

export default {
	barcode: barc,
	qrcode: qrc
}
