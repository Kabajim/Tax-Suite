import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import ModalLinks from './ModalLinks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import StarIconFilled from '@material-ui/icons/Star';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import StarIconEmpty from '@material-ui/icons/StarBorder';
import { startDeleteLink, startToggleLinkFavorite, startAddFavorite, startDeleteFavorite } from '../../actions/dashboard'



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  rootFavIcon: {
    height: 30,
    width: 30
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  iconStar: {
    color: '#FF6900',
    display: "flex",
    position: "absolute"
  },
  gridListTile: {
    height: theme.spacing.unit * 25
},
  gridContainer: {
    flexGrow: 1,
    margin: 0
},
paper: {
  padding: theme.spacing.unit * 2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
},
paperButton: {
  padding: theme.spacing.unit * 2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: "100%",
  display: "flex"
},
button: {
  display: "flex",
  marginTop: "auto",
  marginBottom: "auto",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
},
grid: {
  height: theme.spacing.unit * 30
}
});


class Links extends React.Component {

state = {
    open: false,
    linkID: undefined,
    linkSummary: "",
    linkLink: "",
    linkImage: "",
    isFav: undefined
  };


  handleOpen = (linkID, linkSummary = "", linkLink = "", linkImage = "", isFav) => {
    this.setState({ open: true, linkID, linkSummary, linkLink, linkImage, isFav })
  };

  handleChange = (attribute) => (event) => {
    this.setState ({
      [attribute]: event.target.value
    }) 
  }

  handleClose = () => {
    this.setState({ open: false, linkID: undefined, linkSummary: "", linkLink: "", linkImage: "", isFav: undefined });
  };

  toggleFavorite = ({ containerID, link }) => {
    if (link.isFav === false) {
      this.props.dispatch(startAddFavorite({ link }))
    }
    else if (link.isFav === true) {  
      const favoriteToDelete = this.props.favorites.find((favorite) => (favorite.linkID === link.id))
      this.props.dispatch(startDeleteFavorite(favoriteToDelete))
    }
    this.props.dispatch(startToggleLinkFavorite(containerID, link))
  };


  deleteLink = ({ link }) => {
    if (link.isFav === true) {
      const favoriteToDelete = this.props.favorites.find((favorite) => (favorite.linkID === link.id))
      this.props.dispatch(startDeleteFavorite(favoriteToDelete))}
    this.props.dispatch(startDeleteLink(this.props.containerID, link.id))
  }

render() {

const { classes } = this.props;
  return (
    <div className={classes.root}>
    <Grid className={classes.gridContainer} container spacing={8}>   
                    {this.props.links.map((link) => {
                        return(
                        <Grid item xl={2} lg={3} md={4} xs={6} key={link.id}>
                          <Paper className={classes.paper}>   
                            <GridListTile component="div" classes={{root: classes.gridListTile}}>
                              <IconButton className={classes.iconStar} classes={{root: classes.rootFavIcon}} onClick={() => this.toggleFavorite({ containerID: this.props.containerID, link })}>
                                {link.isFav ? <StarIconFilled /> : <StarIconEmpty />}
                              </IconButton>
                              <a href={link.link} target="_blanket">
                              <img src={link.image} alt={link.summary} />
                              </a>
                              <GridListTileBar title={link.summary} actionIcon={this.props.editable &&
                                <div>
                                <IconButton className={classes.icon} onClick={() => {this.handleOpen(link.id, link.summary, link.link, link.image, link.isFav)}}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton className={classes.icon} onClick={() => {this.deleteLink({ link })}}>
                                  <DeleteIcon />
                                </IconButton>
                                </div>}>
                              </GridListTileBar>
                            </GridListTile>
                          </Paper>
                        </Grid>
                        )})}
                      {this.props.editable && 
                        <Grid item xl={2} lg={3} md={4} xs={6} className={classes.grid}>
                          <Paper className={classes.paperButton}>
                          <Zoom in={this.props.editable}>
                            <Button variant="fab" color="secondary" className={classes.button} onClick={() => this.handleOpen()}>
                              <AddIcon />
                            </Button>
                          </Zoom>
                          </Paper>
                            <ModalLinks 
                            containerID={this.props.containerID}
                            open={this.state.open}
                            linkID={this.state.linkID}
                            linkSummary={this.state.linkSummary}
                            linkLink={this.state.linkLink}
                            linkImage={this.state.linkImage}
                            linkFav={this.state.isFav}
                            handleClose={this.handleClose}
                            handleChange={this.handleChange}
                            />           
                        </Grid>}
    </Grid>
    </div>      
)}}

const mapStateToProps = (state, props) => {
    return {
      editable: state.sidebar.editable,
      links: state.dashboard.linkContainer.find((linkContainer) => props.containerID === linkContainer.id).links,
      favorites: state.dashboard.favorites
    };
  };

export default withStyles(styles)(connect(mapStateToProps)(Links));