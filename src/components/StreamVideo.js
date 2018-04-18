import React, { Component } from "react";
import "./StreamVideo.css";

class StreamVideo extends Component {
  _videoRef = video => {
    const { getRef } = this.props;
    getRef(video);
    this.video = video;
  };

  componentDidMount() {
    const { stream } = this.props;
    if (stream) {
      this.video.srcObject = stream;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { stream } = this.props;
    if (stream && stream !== prevProps.stream) {
      this.video.srcObject = stream;
    }
  }

  render() {
    const { isFailed } = this.props;
    return (
      <div className="StreamVideo">
        {isFailed ? (
          <div>
            <h1>getUserMedia not available</h1>
            Please grant camera permission in the browser
          </div>
        ) : (
          <video ref={this._videoRef} autoPlay />
        )}
      </div>
    );
  }
}

export default StreamVideo;
