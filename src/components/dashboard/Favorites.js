import React from 'react'
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
    root: {
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    gridListTile: {
        height: theme.spacing.unit * 25
    },
    gridContainer: {
        flexGrow: 1
    },
  });

 const Favorites = (props) => {

    const { classes } = props;

    return (
        <div className={classes.root}>
                <Grid className={classes.gridContainer} container spacing={8} justify="space-around">  
                    {props.favorites.map((fav) => {
                        return(
                        <Grid item xl={2} lg={3} md={4} xs={6} key={fav.id}>
                        <Paper className={classes.paper}>
                            <GridListTile component="div" classes={{root: classes.gridListTile}}>
                                <a href={fav.link} target="_blanket">
                                <img src={fav.image} alt={fav.summary} />
                                </a>
                                <GridListTileBar title={fav.summary} />
                            </GridListTile>
                        </Paper>
                    </Grid>
                    )})}
                </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      favorites: state.dashboard.favorites
    };
  };

  export default withStyles(styles)(connect(mapStateToProps)(Favorites));