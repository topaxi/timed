/* global document, Image */

// http://eligrey.com/blog/post/apng-feature-detection/
export function initialize() {
  let apngTest = new Image()
  let ctx      = document.createElement('canvas').getContext('2d')

  apngTest.onload = () => {
    ctx.drawImage(apngTest, 0, 0)

    if (ctx.getImageData(0, 0, 1, 1).data[3] !== 0) {
      document.body.className += ' no-apng'
    }
  }

  apngTest.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=='
}

export default {
  name: 'apng-test'
, initialize
}
