import React, { Component } from "react";
import "./FaceCanvas.css";

class FaceCanvas extends Component {
  canvasCtx = undefined;

  _canvasRef = canvas => {
    this.canvas = canvas;
  };

  componentDidUpdate(prevProps, prevState) {
    const { faces, width, height, showFacialFeatures, isFailed } = this.props;

    if (isFailed) return;

    if (width !== prevProps.width || height !== prevProps.height) {
      this.setupCanvas(width, height);
    }

    this.drawFaces(faces, showFacialFeatures);
  }

  setupCanvas(width, height) {
    if (this.canvasCtx === undefined && width > 0 && height > 0) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvasCtx = this.canvas.getContext("2d");
    }
  }

  drawFaces(faces, showFacialFeatures) {
    const ctx = this.canvasCtx;
    if (ctx === undefined || !faces) return false;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    faces.forEach(face => {
      const { boundingBox, landmarks } = face;

      // Draw faces
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "red";
      ctx.rect(
        boundingBox.x,
        boundingBox.y,
        boundingBox.width,
        boundingBox.height
      );
      ctx.stroke();

      if (showFacialFeatures) {
        // Draw facial features
        landmarks.forEach(landmark => {
          switch (landmark.type) {
            case "eye":
              ctx.fillStyle = "green";
              break;
            case "mouth":
              ctx.fillStyle = "blue";
              break;
            default:
              ctx.fillStyle = "yellow";
          }

          landmark.locations.forEach(location => {
            ctx.fillRect(location.x - 3, location.y - 3, 6, 6);
          });
        });
      }
    });
  }

  render() {
    const { isFailed } = this.props;
    return (
      <div className="FaceCanvas">
        {isFailed ? (
          <div>
            <h1>FaceDetector not available</h1>
            Use Google Chrome and enable experimental web platform features:{" "}
            <br />
            <a href="chrome://flags/#enable-experimental-web-platform-features">
              chrome://flags/#enable-experimental-web-platform-features
            </a>
          </div>
        ) : (
          <canvas ref={this._canvasRef} />
        )}
      </div>
    );
  }
}

export default FaceCanvas;
