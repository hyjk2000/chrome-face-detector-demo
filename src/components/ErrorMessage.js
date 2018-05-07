import React from "react";
import { Paper, withStyles } from "material-ui";
import { Warning as WarningIcon } from "@material-ui/icons";

const styles = {
  paper: {
    position: "relative",
    maxWidth: 500,
    margin: "10vw auto",
    padding: "1em"
  }
};

const ErrorMessage = ({ classes, children }) => (
  <Paper className={classes.paper}>
    <WarningIcon color="error" />
    {children}
  </Paper>
);

export default withStyles(styles)(ErrorMessage);
