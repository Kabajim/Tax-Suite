import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles  = ({
    progress: {
        position: "absolute",
        margin: "auto",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        color: '#FF6900'
    },
});

function LoadingPage(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} size={100} thickness={2.5} />
    </div>
  );
}

export default withStyles(styles)(LoadingPage);