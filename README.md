# [Chrome Face Detector API Demo](https://hyjk2000.github.io/chrome-face-detector-demo/)

[![Build Status](https://travis-ci.org/hyjk2000/chrome-face-detector-demo.svg?branch=master)](https://travis-ci.org/hyjk2000/chrome-face-detector-demo) [![Dependency Status](https://david-dm.org/hyjk2000/chrome-face-detector-demo.svg)](https://david-dm.org/hyjk2000/chrome-face-detector-demo)

## Browser Compatibility

- Google Chrome 57+ with [Experimental Web Platform Features](chrome://flags/#enable-experimental-web-platform-features) enabled ([tracking bug](https://crbug.com/646035))

## APIs Used

- [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) for retrieving camera feed
- [`FaceDetector`](https://wicg.github.io/shape-detection-api/#face-detection-api) for detecting faces in video feed
- [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for drawing face indicators
