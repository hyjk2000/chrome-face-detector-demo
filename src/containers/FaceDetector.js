import React, { Component } from 'react';
import { connect } from 'react-redux';
import { invalidFaceDetect } from '../actions/faceDetect';
import FaceCanvas from '../components/FaceCanvas';

class FaceDetector extends Component {
  state = {
    faces: [],
    videoWidth: 0,
    videoHeight: 0
  };

  faceDetector = undefined;
  tmo = undefined;

  detectFaces = async () => {
    const { dispatch, videoRef, isFailed } = this.props;

    if (!isFailed && videoRef !== undefined && videoRef.videoWidth > 0 && videoRef.videoHeight > 0) {      
      try {
        if (!this.faceDetector) this.faceDetector = new window.FaceDetector({ fastMode: true });
        const faces = await this.faceDetector.detect(videoRef);
        const { videoWidth, videoHeight } = videoRef;
        this.setState(prevState => ({ faces, videoWidth, videoHeight }));
      } catch (e) {
        dispatch(invalidFaceDetect(e));
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { interval } = this.props;
    clearInterval(this.tmo);
    if (interval) {
      this.tmo = setInterval(() => {
        window.requestAnimationFrame(this.detectFaces);
      }, interval);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.tmo);
  }

  render() {
    const { isFailed } = this.props;
    const { faces, videoWidth, videoHeight } = this.state;
    return (
      <div className="FaceDetector">
        <FaceCanvas
          faces={faces}
          width={videoWidth}
          height={videoHeight}
          isFailed={isFailed} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    userMedia: { videoRef },
    faceDetect: { interval, isFailed }
  } = state;
  return { interval, videoRef, isFailed };
}

export default connect(mapStateToProps)(FaceDetector);
