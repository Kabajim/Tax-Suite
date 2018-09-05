import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { startAddLink, startEditLink, startEditFavorite } from '../../actions/dashboard'


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
  buttonAdd: {
    display: "flex",
    marginTop: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
  },
});

class ModalLinks extends React.Component {

  addNewLink = (e) => {
    e.preventDefault();
    const containerID = this.props.containerID;
    const summary = e.target.elements.newName.value;
    const link = e.target.elements.linkAdress.value;
    const image = e.target.elements.imageAdress.value;
    this.props.dispatch(startAddLink({ containerID, summary, link, image }));
    this.props.handleClose();
    }

    editLink = (e) => {
      e.preventDefault();
      const containerID = this.props.containerID;
      const linkID = this.props.linkID;
      const newSummary = e.target.elements.newName.value;
      const newLink = e.target.elements.linkAdress.value;
      const newImage = e.target.elements.imageAdress.value;
      this.props.dispatch(startEditLink(containerID, linkID, newSummary, newLink, newImage));

      if (this.props.linkFav === true) {
        const favoriteToEdit = this.props.favorites.find((favorite) => (favorite.linkID === linkID))
        this.props.dispatch(startEditFavorite(favoriteToEdit, newSummary, newLink, newImage))
      }

      this.props.handleClose();
    }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={() => {this.props.handleClose()}}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <form onSubmit={this.props.linkID ? this.editLink : this.addNewLink}>  
              <Typography variant="title" id="modal-title">
                {this.props.linkID ? "Please update all necceccary fields down below" : "Please enter all fields below for the new Link"}
              </Typography>
              <TextField 
              fullWidth
              autoFocus
              required
              name="newName"
              label="Summary"
              value={this.props.linkSummary}
              onChange={this.props.handleChange("linkSummary")}
              type="text"
              />
              <TextField 
              fullWidth
              required
              name="linkAdress"
              label="Link Adress"
              value={this.props.linkLink}
              onChange={this.props.handleChange("linkLink")}
              type="text"
              />
              <TextField 
              fullWidth
              required
              name="imageAdress"
              label="Image Adress"
              value={this.props.linkImage}
              onChange={this.props.handleChange("linkImage")}
              type="text"
              />
                <Button variant="contained" color="secondary" size="large" type="submit" className={classes.buttonAdd}>
                  {this.props.linkID ? "Edit" : "Add"}
                </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.dashboard.favorites
  };
};

export default withStyles(styles)(connect(mapStateToProps)(ModalLinks));