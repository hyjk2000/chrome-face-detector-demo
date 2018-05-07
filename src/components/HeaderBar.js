import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  Button
} from "material-ui";
import { Menu as MenuIcon } from "@material-ui/icons";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const HeaderBar = ({ onDrawerOpen, classes }) => (
  <div className={classes.root}>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          FaceDetector Demo
        </Typography>
        <Button
          color="inherit"
          href="https://github.com/hyjk2000/chrome-face-detector-demo"
        >
          View Source
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(HeaderBar);
