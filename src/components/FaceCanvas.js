import React, { Component } from "react";
import { Typography, withStyles } from "material-ui";
import ErrorMessage from "./ErrorMessage";
import { fullScreen } from "../styles";

const styles = { fullScreen };

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
    const { isFailed, classes } = this.props;
    return (
      <div className="FaceCanvas">
        {isFailed ? (
          <ErrorMessage>
            <Typography variant="headline" color="inherit">
              FaceDetector not available
            </Typography>
            <Typography color="inherit" component="p">
              Use Google Chrome and enable experimental web platform features:{" "}
              <br />
              <a href="chrome://flags/#enable-experimental-web-platform-features">
                chrome://flags/#enable-experimental-web-platform-features
              </a>
            </Typography>
          </ErrorMessage>
        ) : (
          <canvas ref={this._canvasRef} className={classes.fullScreen} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FaceCanvas);
