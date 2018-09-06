import database from '../firebase/firebase'

// ADD_FAVORITE
export const addFavorite = (newFavorite) => ({
    type: 'ADD_FAVORITE',
    newFavorite
});

export const startAddFavorite = ({ link }) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        const newFavorite = { summary: link.summary, link: link.link, image: link.image, linkID: link.id }
        database.ref(`users/${userID}/dashboard/favorites`).push(newFavorite).then((ref) => {
            dispatch(addFavorite({
                id: ref.key,
                ...newFavorite
            }))
        })
    }
}

// EDIT_FAVORITE
export const editFavorite = (favoriteToEdit, newSummary, newLink, newImage) => ({
    type: 'EDIT_FAVORITE',
    favoriteID: favoriteToEdit.id,
    summary: newSummary,
    link: newLink,
    image: newImage
});

export const startEditFavorite = (favoriteToEdit, newSummary, newLink, newImage) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        database.ref(`users/${userID}/dashboard/favorites/${favoriteToEdit.id}`).update({
            summary: newSummary,
            link: newLink,
            image: newImage
        }).then(() => {
            dispatch(editFavorite(favoriteToEdit, newSummary, newLink, newImage))
        })
    }
}

// DELETE_FAVORITE
export const deleteFavorite = (favoriteID) => ({
    type: 'DELETE_FAVORITE',
    favoriteID
    }
);

export const startDeleteFavorite = ({ id }) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        database.ref(`users/${userID}/dashboard/favorites/${id}`).remove().then(() => {
            dispatch(deleteFavorite(id))
        })
    }
}

// ADD_LINKCONTAINER
export const addLinkContainer = (newContainer) => ({
    type: 'ADD_LINKCONTAINER',
    newContainer
});

export const startAddLinkContainer = ({ name }) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        const newContainer = { name, links: {} };
        database.ref(`users/${userID}/dashboard/linkContainer`).push(newContainer).then((ref) => {
            dispatch(addLinkContainer({
                id: ref.key,
                ...newContainer,
                links: []
            }))
        })
    }
}

// EDIT_LINKCONTAINER
export const editLinkContainer = (containerID, newName) => ({
    type: 'EDIT_LINKCONTAINER',
    id: containerID,
    name: newName
});

export const startEditLinkContainer = (containerID, newName) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        database.ref(`users/${userID}/dashboard/linkContainer/${containerID}`).update({name: newName}).then(() => {
            dispatch(editLinkContainer(containerID, newName))
        })
    }
}

// DELETE_LINKCONTAINER
export const deleteLinkContainer = (containerID) => ({
    type: 'DELETE_LINKCONTAINER',
    id: containerID,
});

export const startDeleteLinkContainer = (containerID) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        database.ref(`users/${userID}/dashboard/linkContainer/${containerID}`).remove().then(() => {
            dispatch(deleteLinkContainer(containerID))
        })
    }
}

// ADD_LINK
export const addLink = (containerID, newLink) => ({
    type: 'ADD_LINK',
    containerID,
    newLink
});

export const startAddLink = ({ containerID, summary, link, image }) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        const newLink = { summary, link, image, isFav: false };
        database.ref(`users/${userID}/dashboard/linkContainer/${containerID}/links`).push(newLink).then((ref) => {
            dispatch(addLink(
                containerID,
                {
                id: ref.key,
                ...newLink
                }))
        })
    }
}

// EDIT_LINK
export const editLink = (containerID, linkID, newSummary, newLink, newImage) => ({
    type: 'EDIT_LINK',
    containerID,
    linkID,
    summary: newSummary,
    link: newLink,
    image: newImage
});

export const startEditLink = (containerID, linkID, newSummary, newLink, newImage) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        database.ref(`users/${userID}/dashboard/linkContainer/${containerID}/links/${linkID}`).update({
            summary: newSummary,
            link: newLink,
            image: newImage
        }).then(() => {
            dispatch(editLink(containerID, linkID, newSummary, newLink, newImage))
        })
    }
}

// TOGGLE_LINK_FAVORITE
export const toggleLinkFavorite = (containerID, link) => ({
    type: 'TOGGLE_LINK_FAVORITE',
    containerID,
    link,
});

export const startToggleLinkFavorite = (containerID, link) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        database.ref(`users/${userID}/dashboard/linkContainer/${containerID}/links/${link.id}`).update({isFav: !link.isFav}).then((ref) => {
            dispatch(toggleLinkFavorite(
                containerID,
                link
            ))
        })
    }
}

// DELETE_LINK  
export const deleteLink = (containerID, linkID) => ({
    type: 'DELETE_LINK',
    containerID,
    linkID
});

export const startDeleteLink = (containerID, linkID) => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        database.ref(`users/${userID}/dashboard/linkContainer/${containerID}/links/${linkID}`).remove().then(() => {
            dispatch(deleteLink(containerID, linkID))
        })
    }
}

// SET_DASHBOARD

export const setDashboardState = (dashboardState) => ({
    type: 'SET_DASHBOARDSTATE',
    dashboardState
});

export const startSetDashboardState = () => {
    return (dispatch, getState) => {
        const userID = getState().user.ID
        return database.ref(`users/%{userID}/dashboard`).once('value').then((snapshot) => {
            
            const favorites = [];
            const linkContainer = [];
            
            snapshot.forEach((childSnapshot) => {
                switch(childSnapshot.key) {
                    case 'favorites': 
                        childSnapshot.forEach((favoriteChildSnapShot) => {
                            favorites.push({
                                id: favoriteChildSnapShot.key,
                                ...favoriteChildSnapShot.val()
                            })
                        })
                        break;
                    case 'linkContainer': 
                        childSnapshot.forEach((linkContainerChildSnapshot) => {
                            const links = [];
                            linkContainerChildSnapshot.forEach((linkContainerChildChildSnapshot) => {
                                if (linkContainerChildChildSnapshot.key === "links"){
                                    linkContainerChildChildSnapshot.forEach((linkContainerLinks) => {
                                        links.push({
                                            id: linkContainerLinks.key,
                                            ...linkContainerLinks.val()
                                        })
                                    })
                                }
                            })        
                            linkContainer.push({
                                id: linkContainerChildSnapshot.key,
                                ...linkContainerChildSnapshot.val(),
                                links
                            })
                        })
                        break;
                }
            })
            dispatch(setDashboardState({favorites, linkContainer}))
        });
    }
}

export const startClearDashboardState = (props) => {
    return (dispatch) => {
        const favorites = [];
        const linkContainer = [];
        dispatch(setDashboardState({favorites, linkContainer}))
    }
}