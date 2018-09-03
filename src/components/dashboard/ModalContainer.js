import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addLinkContainer, editLinkContainer } from '../../actions/dashboard'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  button: {
    display: "flex",
    marginRight: "auto",
    marginLeft: "auto",
    left: 0,
    right: 0,
    marginTop: theme.spacing.unit * 2 
  }
});

class ModalContainer extends React.Component {

  addNewContainer = (e) => {
    e.preventDefault();
    const newName = e.target.elements.newName.value;
    this.props.dispatch(addLinkContainer({name: newName }));
    this.props.handleClose();
    }

  editLinkContainer = (e) => {
    e.preventDefault();
    const newName = e.target.elements.newName.value;
    this.props.dispatch(editLinkContainer({containerID: this.props.containerID, newName: newName}))
    this.props.handleClose();
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <form onSubmit={this.props.containerID ? this.editLinkContainer : this.addNewContainer}>  
              <Typography variant="title" id="modal-title">
                {this.props.containerID ? "Please enter a new name for the Link Container" : "Please enter a name for the new Link Container"}
              </Typography>
              <TextField 
              fullWidth
              required
              name = "newName"
              label = "Summary"
              type = "text"
              value = {this.props.containerName}
              onChange = {this.props.handleChange("containerName")}
              />
                <Button variant="contained" color="secondary" size="large" type="submit" className={classes.button}>
                  {this.props.containerID ? "Edit" : "Add"}
                </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(connect()(ModalContainer));