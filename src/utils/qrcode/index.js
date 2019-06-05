'use strict';

// 模块
import Taro from '@tarojs/taro';
import gifImg from './gifImg';
import { utf16to8 } from './encode';
import QRCode from './qrcode';

// 变量
const MathC = Math.ceil;
const MathF = Math.floor;
const MathR = Math.round;

// 输出为base64
export const outputQRCodeBase64 = function (text, options) {
    let txt = utf16to8(text),
        ecc = options.ecc || 'H',
        size = options.size || 256,
        typeNumber = -1,
        padding = options.padding || 0,
        foreground = options.color || '#000000',
        background = options.background || '#ffffff';

    // create the qrcode itself
    let qrcode = new QRCode(typeNumber, ecc);
    qrcode.addData(txt);
    qrcode.make();

    // calc width
    let count = qrcode.getModuleCount(),
        width = (size - padding * 2) / count;

    let min = padding,
        max = size - padding;

    return gifImg(size, foreground, background, function (x, y) {
        if (min <= x && x < max && min <= y && y < max) {
            let c = MathF((x - min) / width);
            let r = MathF((y - min) / width);

            return qrcode.isDark(r, c) ? 0 : 1;
        } else {
            return 1;
        }
    });
}

// 绘制到canvas
export const drawQRCodeToCanvas = function (text, options) {
    let x = options.x || 0,
        y = options.y || 0,
        txt = utf16to8(text),
        ctx = typeof options.ctx === 'string' ? Taro.createCanvasContext(options.ctx) : options.ctx,
        ecc = options.ecc || 'H',
        size = typeof options.size === 'number' ? MathF(options.size) : 256,
        padding = options.padding || 0,
        typeNumber = -1,
        foreground = options.color || '#000000',
        background = options.background || '#ffffff';

    // create the qrcode itself
    let qrcode = new QRCode(typeNumber, ecc);
    qrcode.addData(txt);
    qrcode.make();

    // compute width based on size
    let count = qrcode.getModuleCount(),
        width = (size - padding * 2) / count;

    // background
    ctx.setFillStyle(background);
    ctx.fillRect(x, y, size, size);

    // draw in the canvas
    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
            let w = (MathC((col + 1) * width) - MathF(col * width));
            let h = (MathC((row + 1) * width) - MathF(row * width));

            ctx.setFillStyle(qrcode.isDark(row, col) ? foreground : background);

            ctx.fillRect(x + MathR(col * width) + padding, y + MathR(row * width) + padding, w, h);
        }
    }

    if (typeof options.ctx === 'string') {
        ctx.draw();
    }
}
