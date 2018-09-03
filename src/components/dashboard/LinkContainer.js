import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { deleteLinkContainer } from '../../actions/dashboard'
import ModalContainer from './ModalContainer'
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Links from './Links'

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 2
  },
  rootOpen: {
    marginLeft: theme.spacing.unit * 32,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionPanelAction: {
    padding: 8,
  },
  button: {
    display: "flex",
    marginRight: "auto",
    marginLeft: "auto",
    left: 0,
    right: 0,
    marginTop: theme.spacing.unit * 2 
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

class LinkContainer extends React.Component {

state = {
  open: false,
  containerID: undefined,
  containerName: "",
};

handleOpen = (containerID, containerName = "") => {
  this.setState({ open: true, containerID, containerName });
};

handleClose = () => {
  this.setState({ open: false, containerID: undefined, containerName: ""});
};

handleChange = (attribute) => (event) => {
  this.setState ({
    [attribute]: event.target.value
}) 
}


render () {
  
const { classes } = this.props;
  
  return (
    <div className={classes.root}>
      {this.props.linkContainer.map((container) => {      
        return (
          <ExpansionPanel key={container.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{container.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Links 
            containerID={container.id} 
            />
          </ExpansionPanelDetails>
          {this.props.editable && <Divider />}
          {this.props.editable && <ExpansionPanelActions classes={{root: classes.expansionPanelAction}}>
          <IconButton className={classes.icon} onClick={() => {this.handleOpen(container.id, container.name)}}>
              <EditIcon />
            </IconButton>  
          <IconButton className={classes.icon} onClick={() => {this.props.dispatch(deleteLinkContainer({ containerID: container.id }))}}>
              <DeleteIcon />
            </IconButton>
          </ExpansionPanelActions>}
        </ExpansionPanel>
      )
    })}
    {this.props.editable && 
        <Zoom in={this.props.editable}>
          <Button variant="fab" color="secondary" className={classes.button} onClick={() => this.handleOpen()}>
            <AddIcon />
          </Button>
        </Zoom>}
        <ModalContainer 
        open = {this.state.open}
        containerName = {this.state.containerName}
        handleClose = {this.handleClose}
        handleChange = {this.handleChange}
        containerID = {this.state.containerID}
        />
    </div>
  );
}
}

const mapStateToProps = (state) => {
    return {
      editable: state.sidebar.editable,
      linkContainer: state.dashboard.linkContainer
    };
  };

export default withStyles(styles)(connect(mapStateToProps)(LinkContainer));