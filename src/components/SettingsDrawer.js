import React, { Component } from "react";
import { Drawer, withStyles } from "material-ui";
import FaceDetectorSettings from "../containers/FaceDetectorSettings";

const styles = {
  content: {
    width: 250,
  }
};

class SettingsDrawer extends Component {
  state = {
    open: false,
  };

  toggleDrawer = open => () => {
    this.setState({ open });
  };

  render() {
    const { open, onClose, classes } = this.props;

    return (
      <Drawer
        open={open}
        onClose={onClose}
      >
        <div className={classes.content}>
          <FaceDetectorSettings />
        </div>
      </Drawer>
    );
  };
}

export default withStyles(styles)(SettingsDrawer);
