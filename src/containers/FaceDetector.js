import React, { Component } from 'react';
import { connect } from 'react-redux';
import { invalidFaceDetect } from '../actions/faceDetect';
import FaceCanvas from '../components/FaceCanvas';

class FaceDetector extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    try {
      this.faceDetector = new window.FaceDetector({ fastMode: true });
    } catch (e) {
      dispatch(invalidFaceDetect(e));
    }

    this.state = {
      faces: undefined,
      videoWidth: undefined,
      videoHeight: undefined
    };
  }

  detectFaces = async () => {
    const { dispatch, videoRef } = this.props;

    if (videoRef !== undefined && videoRef.videoWidth > 0 && videoRef.videoHeight > 0) {      
      try {
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
    const { isFaceDetectorFailed } = this.props;
    const { faces, videoWidth, videoHeight } = this.state;
    return (
      <div className="FaceDetector">
        <FaceCanvas
          faces={faces}
          width={videoWidth}
          height={videoHeight}
          isFailed={isFaceDetectorFailed} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    userMedia: { videoRef, isFailed: isUserMediaFailed },
    faceDetect: { interval, isFailed: isFaceDetectorFailed }
  } = state;
  return { interval, videoRef, isUserMediaFailed, isFaceDetectorFailed };
}

export default connect(mapStateToProps)(FaceDetector);
