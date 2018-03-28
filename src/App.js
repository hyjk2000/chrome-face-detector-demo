import React, { Component } from 'react';
import './App.css';

import ErrorBoundary from './ErrorBoundary';
import FaceIndicator from './FaceIndicator';

const mediaConstraints = {
  video: {
    width: { min: 640, ideal: 1280 },
    height: { min: 480, ideal: 720 },
    facingMode: 'user'
  },
  audio: false
};

class App extends Component {
  constructor(props) {
    super(props);

    if (! ('getUserMedia' in navigator.mediaDevices)) {
      console.error('Webcam not available');
      return false;
    }

    this.state = {
      video: undefined
    };
  }

  _videoRef = (video) => {
    this.video = video;
  };

  async componentDidMount() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      this.video.srcObject = stream;
      this.setState({
        video: this.video
      });
    } catch (error) {
      console.error(error);
    };
  }

  render() {
    const { video } = this.state;

    return (
      <div className="App">
        <video ref={this._videoRef} autoPlay />
        <ErrorBoundary>
          <FaceIndicator video={video} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
