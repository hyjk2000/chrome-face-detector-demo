import React, { Component } from "react";
import { connect } from "react-redux";
import { registerVideoRef, fetchUserMediaIfNeeded } from "../actions/userMedia";
import StreamVideo from "../components/StreamVideo";
import FaceDetector from "../containers/FaceDetector";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserMediaIfNeeded());
  }

  handleRegisterVideoRef = ref => {
    const { dispatch } = this.props;
    dispatch(registerVideoRef(ref));
  };

  render() {
    const { stream, isFailed } = this.props;
    return (
      <div className="App">
        <StreamVideo
          stream={stream}
          isFailed={isFailed}
          getRef={this.handleRegisterVideoRef}
        />
        <FaceDetector />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    userMedia: { stream, isFailed }
  } = state;
  return { stream, isFailed };
};

export default connect(mapStateToProps)(App);
