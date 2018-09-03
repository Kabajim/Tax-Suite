import React from 'react';
import LinkContainer from './LinkContainer';
import Favorites from './Favorites'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
    rootOpen: {
      marginLeft: theme.spacing.unit * 30,
    },
  });

const DashboardV2 = (props) => {
    const { classes } = props;
    return (
    <div className={props.open ? classes.rootOpen : undefined}>
        <Favorites />
        <LinkContainer />
    </div>
    );
}

const mapStateToProps = (state) => {
    return {
      open: state.sidebar.open
    };
  };

export default withStyles(styles)(connect(mapStateToProps)(DashboardV2));
