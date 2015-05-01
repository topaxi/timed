/* global document, Image */

const APNG_DATA = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAA' +
                  'ABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwA' +
                  'AAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImW' +
                  'NgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=='

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

  apngTest.src = `data:image/png;base64,${APNG_DATA}`
}

export default {
  name: 'apng-test'
, initialize
}
