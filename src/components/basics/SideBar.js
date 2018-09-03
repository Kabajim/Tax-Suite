import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from "@material-ui/icons/Home"


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'fixed',
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0
  },
});

const Navigation = (props) => {

    const { classes } = props;

    return (
      <div className={classes.root}>
        <Drawer
          variant="persistent"
          classes={{
            paper: classNames(classes.drawerPaper, !props.open && classes.drawerPaperClose),
          }}
          open={props.open}
        >
          <Divider />
          <List>
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </List>
        </Drawer>
        </div>
    );
  }

const mapStateToProps = (state) => {
    return {
        open: state.sidebar.open
    };
  };

export default withStyles(styles)(connect(mapStateToProps)(Navigation));
