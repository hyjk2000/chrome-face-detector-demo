import React, { Component } from "react";
import { connect } from "react-redux";
import { registerVideoRef, fetchUserMediaIfNeeded } from "../actions/userMedia";
import HeaderBar from "../components/HeaderBar";
import SettingsDrawer from "../components/SettingsDrawer";
import StreamVideo from "../components/StreamVideo";
import FaceDetector from "../containers/FaceDetector";
import { toggleSettingsDrawer } from "../actions/settingsDrawer";
import { MuiThemeProvider } from "material-ui";
import { muiTheme } from "../styles";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserMediaIfNeeded());
  }

  handleDrawerToggle = open => () => {
    const { dispatch } = this.props;
    dispatch(toggleSettingsDrawer(open));
  };

  handleRegisterVideoRef = ref => {
    const { dispatch } = this.props;
    dispatch(registerVideoRef(ref));
  };

  render() {
    const { stream, isFailed, drawerOpen } = this.props;
    return (
      <MuiThemeProvider theme={muiTheme}>
        <HeaderBar
          onDrawerOpen={this.handleDrawerToggle(true)}
        />
        <SettingsDrawer
          open={drawerOpen}
          onClose={this.handleDrawerToggle(false)}
        />
        <StreamVideo
          stream={stream}
          isFailed={isFailed}
          getRef={this.handleRegisterVideoRef}
        />
        <FaceDetector />
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  const {
    settingsDrawer: { open: drawerOpen },
    userMedia: { stream, isFailed }
  } = state;
  return { drawerOpen, stream, isFailed };
};

export default connect(mapStateToProps)(App);
