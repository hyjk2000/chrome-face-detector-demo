import React, { Component } from 'react';
import './App.css';

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

    if (! ('getUserMedia' in navigator)) {
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

  componentDidMount() {
    navigator.getUserMedia(
      mediaConstraints,
      (stream) => {
        this.video.srcObject = stream;
        this.setState({
          video: this.video
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  render() {
    const { video } = this.state;

    return (
      <div className="App">
        <video ref={this._videoRef} autoPlay />
        <FaceIndicator video={video} />
      </div>
    );
  }
}

export default App;
