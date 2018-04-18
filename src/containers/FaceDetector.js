import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setFaceDetectInterval,
  setShowFacialFeatures,
  invalidFaceDetect
} from "../actions/faceDetect";
import FaceCanvas from "../components/FaceCanvas";
import FaceDetectSettings from "../components/FaceDetectSettings";

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

    if (
      !isFailed &&
      videoRef !== undefined &&
      videoRef.videoWidth > 0 &&
      videoRef.videoHeight > 0
    ) {
      try {
        if (!this.faceDetector)
          this.faceDetector = new window.FaceDetector({ fastMode: true });
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

  handleIntervalChange = interval => {
    const { dispatch } = this.props;
    dispatch(setFaceDetectInterval(interval));
  };

  handleShowFacialFeaturesChange = showFacialFeatures => {
    const { dispatch } = this.props;
    dispatch(setShowFacialFeatures(showFacialFeatures));
  };

  render() {
    const { interval, showFacialFeatures, isFailed } = this.props;
    const { faces, videoWidth, videoHeight } = this.state;
    return (
      <div className="FaceDetector">
        <FaceCanvas
          faces={faces}
          width={videoWidth}
          height={videoHeight}
          showFacialFeatures={showFacialFeatures}
          isFailed={isFailed}
        />
        <FaceDetectSettings
          settings={{ interval, showFacialFeatures }}
          handleIntervalChange={this.handleIntervalChange}
          handleShowFacialFeaturesChange={this.handleShowFacialFeaturesChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    userMedia: { videoRef },
    faceDetect: { interval, showFacialFeatures, isFailed }
  } = state;
  return { videoRef, interval, showFacialFeatures, isFailed };
};

export default connect(mapStateToProps)(FaceDetector);
