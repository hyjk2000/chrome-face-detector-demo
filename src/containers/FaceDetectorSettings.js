import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  withStyles
} from "material-ui";
import { connect } from "react-redux";
import {
  setFaceDetectInterval,
  setShowFacialFeatures
} from "../actions/faceDetect";

const styles = theme => ({
  formControl: {
    margin: "10px 20px",
    minWidth: 250 - 20 * 2
  }
});

class FaceDetectorSettings extends Component {
  handleIntervalChange = e => {
    const { dispatch } = this.props;
    dispatch(setFaceDetectInterval(e.target.value));
  };

  handleShowFacialFeaturesChange = e => {
    const { dispatch } = this.props;
    dispatch(setShowFacialFeatures(e.target.checked));
  };

  render() {
    const { classes, interval, showFacialFeatures } = this.props;

    return (
      <div>
        <FormControl className={classes.formControl}>
          <Typography variant="headline" color="inherit" component="h3">
            Options
          </Typography>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="interval">Refresh Rate</InputLabel>
          <Select
            value={interval}
            onChange={this.handleIntervalChange}
            inputProps={{
              name: "interval",
              id: "interval"
            }}
          >
            <MenuItem value={1000}>1 Hz</MenuItem>
            <MenuItem value={500}>2 Hz</MenuItem>
            <MenuItem value={250}>4 Hz</MenuItem>
            <MenuItem value={100}>10 Hz</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          className={classes.formControl}
          control={
            <Switch
              checked={showFacialFeatures}
              onChange={this.handleShowFacialFeaturesChange}
              color="primary"
            />
          }
          label="Show Facial Features"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    faceDetect: { interval, showFacialFeatures }
  } = state;
  return { interval, showFacialFeatures };
};

export default withStyles(styles)(
  connect(mapStateToProps)(FaceDetectorSettings)
);
