import React from 'react';
import { Link} from 'react-router-dom';

const PageNotFound = (props) => {

    props.history.push("/dashboard")

    return (
    <p>404! - <Link to="/dashboard">Go Home</Link></p>
    )
}

export default PageNotFound;