import React, { Component } from 'react';
import './FaceIndicator.css';

class FaceIndicator extends Component {
  constructor(props) {
    super(props);

    if (! ('FaceDetector' in window)) {
      console.error('FaceDetector not available - use Chrome and enable experimental web platform features (chrome://flags/#enable-experimental-web-platform-features)');
      return false;
    }
    this.faceDetector = new window.FaceDetector({ fastMode: true });

    this.canvasCtx = undefined;
  }

  _canvasRef = (canvas) => {
    this.canvas = canvas;
  };

  detectFaces = async () => {
    const { video } = this.props;
    if (video === undefined) return;
    const { videoWidth, videoHeight } = video;

    if (this.canvasCtx === undefined) {
      this.canvas.width = videoWidth;
      this.canvas.height = videoHeight;
      this.canvasCtx = this.canvas.getContext('2d');
    }

    try {
      const faces = await this.faceDetector.detect(video);
      this.drawFaces(faces);
    } catch (error) {
      console.error(`Face detection failed: ${error}`);
    }
  };

  drawFaces(faces) {
    const ctx = this.canvasCtx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    faces.forEach((face) => {
      const { boundingBox, landmarks } = face;

      // Draw faces
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'red';
      ctx.rect(boundingBox.x,
               boundingBox.y,
               boundingBox.width,
               boundingBox.height);
      ctx.stroke();

      // Draw landmarks
      landmarks.forEach((landmark) => {
        switch (landmark.type) {
          case 'eye':
            ctx.fillStyle = 'green';
            break;
          case 'mouth':
            ctx.fillStyle = 'blue';
            break;
          default:
            ctx.fillStyle = 'yellow';
        }

        ctx.fillRect(landmark.location.x - 3,
                     landmark.location.y - 3,
                     6,
                     6);
      });
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      window.requestAnimationFrame(this.detectFaces);
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="FaceIndicator">
        <canvas ref={this._canvasRef} />
      </div>
    );
  }
}

export default FaceIndicator;
