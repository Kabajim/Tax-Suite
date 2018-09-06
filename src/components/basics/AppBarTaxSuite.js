import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { toggleOpen, toggleEditable } from '../../actions/sidebar'
import { startLogin, startLogout } from '../../actions/auth'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: theme.spacing.unit * 8,
    zIndex: 2,
    overflow: 'hidden',
    position: 'sticky',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  flex: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing.unit
  }
});

const AppBarTaxSuite = (props) => {

  const currentPage = (pathname) => {
    switch (pathname) {
      case "dashboard": 
        return "Dashboard";
      default:
        return "Tax-Suite"
    }
  }

  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            onClick={() => {props.dispatch(toggleOpen())}}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex} noWrap>
            {currentPage((props.location.pathname.split("/")[1]))}
          </Typography>
          <Switch
          checked={props.editable}
          onChange={() => {props.dispatch(toggleEditable())}}
          value="editable"
          color="secondary"
          />
          <Button variant="contained" color="secondary" className={classes.button} onClick={() => {props.dispatch(startLogin())}}>
            Login
          </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={() => {props.dispatch(startLogout())}}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      </div>
  );
}

const mapStateToProps = (state) => {
    return {
      editable: state.sidebar.editable
    };
  };

export default withStyles(styles)(connect(mapStateToProps)(AppBarTaxSuite));
