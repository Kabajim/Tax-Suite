import uuid from 'uuid'

// ADD_FAVORITE
export const addFavorite = ({ link }) => ({
    type: 'ADD_FAVORITE',
    newFavorite: {
    id: uuid(),
    summary: link.summary,
    link: link.link,
    image: link.image,
    linkID: link.id
    }
});
// EDIT_FAVORITE
export const editFavorite = ({ linkID, newSummary, newLink, newImage }) => ({
    type: 'EDIT_FAVORITE',
    linkID,
    summary: newSummary,
    link: newLink,
    image: newImage
});

// DELETE_FAVORITE
export const deleteFavorite = ({ link }) => ({
    type: 'DELETE_FAVORITE',
    linkID: link.id
    }
);


// ADD_LINKCONTAINER
export const addLinkContainer = ({ name }) => ({
    type: 'ADD_LINKCONTAINER',
    newContainer: {
    id: uuid(),
    name,
    links: []
    }
});

// EDIT_LINKCONTAINER
export const editLinkContainer = ({ containerID, newName }) => ({
    type: 'EDIT_LINKCONTAINER',
    id: containerID,
    name: newName
});

// DELETE_LINKCONTAINER
export const deleteLinkContainer = ({ containerID }) => ({
    type: 'DELETE_LINKCONTAINER',
    id: containerID,
});

// ADD_LINK
export const addLink = ({ containerID, summary, link, image }) => ({
    type: 'ADD_LINK',
    containerID,
    newLink: {
    id: uuid(),
    summary,
    link,
    image,
    isFav: false
    }
});

// EDIT_LINK
export const editLink = ({ containerID, linkID, newSummary, newLink, newImage }) => ({
    type: 'EDIT_LINK',
    containerID,
    linkID,
    summary: newSummary,
    link: newLink,
    image: newImage
});

// TOGGLE_LINK_FAVORITE
export const toggleLinkFavorite = ({ containerID, link }) => ({
    type: 'TOGGLE_LINK_FAVORITE',
    containerID,
    link,
});

// DELETE_LINK  
export const deleteLink = ({ containerID, linkID }) => ({
    type: 'DELETE_LINK',
    containerID,
    linkID
});
