import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

export const PageNotFound = ({ isAuthenticated }) => ( 

    isAuthenticated ? (
        <Redirect to="/dashboard" />
    ) : (
        <Typography align="center" variant="headline" style={{
        position: "relative",
        top: 100
        }}
        >Please Login to use Tax-Suite</Typography>
    )
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.ID
})

export default connect(mapStateToProps)(PageNotFound);