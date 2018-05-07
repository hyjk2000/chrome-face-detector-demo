import React, { Component } from "react";
import { Typography, withStyles } from "material-ui";
import ErrorMessage from "./ErrorMessage";
import { fullScreen } from "../styles";

const styles = { fullScreen };

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
    const { isFailed, classes } = this.props;
    return (
      <div className="StreamVideo">
        {isFailed ? (
          <ErrorMessage>
            <Typography variant="headline" color="inherit">
              getUserMedia not available
            </Typography>
            <Typography color="inherit" component="p">
              Please grant camera permission
            </Typography>
          </ErrorMessage>
        ) : (
          <video ref={this._videoRef} autoPlay className={classes.fullScreen} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(StreamVideo);
