import React from 'react'
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        bottom: theme.spacing.unit,
        marginRight: "auto",
        marginLeft: "auto",
        left: 0,
        right: 0
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit
    },
    gridList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
    gridTile: {
        heigth: theme.spacing.unit * 8,
        width: theme.spacing.unit * 8 
    }
    })

 class Dashboard extends React.Component {

  render() {

    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <GridList cellHeight={50} className={classes.gridList} cols={4} spacing={10}>
                    <GridListTile key="Gmail" classes={{tile: classes.gridTile}}>
                        <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Gmail_Icon.svg/2000px-Gmail_Icon.svg.png" 
                        alt="Gmail"
                        />
                    </GridListTile>
                    <GridListTile key="Calendar" classes={{tile: classes.gridTile}}>
                        <img 
                        src="https://applets.imgix.net/https%3A%2F%2Fassets.ifttt.com%2Fimages%2Fchannels%2F1396293310%2Ficons%2Fon_color_large.png%3Fversion%3D0?ixlib=rails-2.1.3&w=240&h=240&auto=compress&s=9ebffca546fed4847edd7ddd69d7a4f5" 
                        alt="Google Calendar" 
                        />
                    </GridListTile>
                    <GridListTile key="Asana" classes={{tile: classes.gridTile}}>
                        <img 
                        src="https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-04-04/341591994389_f9b34fbf501c8b52203d_512.png" 
                        alt="Asana Tasklist" 
                        />
                    </GridListTile>
                    <GridListTile key="JIRA" classes={{tile: classes.gridTile}}>
                        <img 
                        src="https://dev.acquia.com/sites/default/files/styles/blog_node_image/public/jira_0.png?itok=GQmaVGBC" 
                        alt="JIRA Tickets" 
                        />
                    </GridListTile>
                </GridList>
            </Paper>
        </div>
    )
}
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  export default withStyles(styles)(Dashboard);