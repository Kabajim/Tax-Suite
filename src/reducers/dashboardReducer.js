// Dashboard Reducer

const dashboardReducerDefaultState = {
    favorites:[],
    linkContainer:[]
};

export default (state = dashboardReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [
          ...state.favorites,
          action.newFavorite
        ]
      };

    case 'EDIT_FAVORITE':
    console.log(action)
      return {
        ...state,
        favorites: state.favorites.map((favorite) => {
          if (favorite.id === action.favoriteID) {
            return {
            ...favorite,
            summary: action.summary,
            link: action.link,
            image: action.image
            }
          }
          else {
            return favorite
          }
        })
      }

    case 'DELETE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(({ id }) => id !== action.favoriteID)
      }; 

    case 'ADD_LINKCONTAINER':
      return {
        ...state,
        linkContainer: [
        ...state.linkContainer,
        action.newContainer
      ]};

    case 'EDIT_LINKCONTAINER':
      return {
        ...state,
        linkContainer: state.linkContainer.map((linkContainer) => {
          if (linkContainer.id === action.id) {
            return {
              ...linkContainer,
              name: action.name
            }
          }
          else {
            return linkContainer
          }
        })
      };

    case 'DELETE_LINKCONTAINER':
      return {
          ...state,
          linkContainer: state.linkContainer.filter(({ id }) => id !== action.id)
      }; 

    case 'ADD_LINK':
      return {
        ...state,
        linkContainer: state.linkContainer.map((linkContainer) => {
          if (linkContainer.id === action.containerID) {
            return {
              ...linkContainer,
              links: [ 
                ...linkContainer.links,
                action.newLink
              ]
            }
          }
          else {
            return linkContainer
          }
        })
    };

    case 'EDIT_LINK':
      return {
        ...state,
        linkContainer: state.linkContainer.map((linkContainer) => {
          if (linkContainer.id === action.containerID) {
            return {
              ...linkContainer,
              links: linkContainer.links.map ((link) => {
                if (link.id === action.linkID) {
                  return {
                  ...link,
                  summary: action.summary,
                  link: action.link,
                  image: action.image
                  }
                }
                else {
                  return link
                }
              }) 
            }
          }
          else {
            return linkContainer
          }
        })
      };

    case 'TOGGLE_LINK_FAVORITE':
      return {
        ...state,
        linkContainer: state.linkContainer.map((linkContainer) => {
          if (linkContainer.id === action.containerID) {
            return {
              ...linkContainer,
              links: linkContainer.links.map ((link) => {
                if (link.id === action.link.id) {
                  return {
                  ...link,
                  isFav: !action.link.isFav
                  }
                }
                else {
                  return link
                }
              }) 
            }
          }
          else {
            return linkContainer
          }
        })
      };

    case 'DELETE_LINK':
      return {
        ...state,
        linkContainer: state.linkContainer.map((linkContainer) => {
          if (linkContainer.id === action.containerID) {
            return {
              ...linkContainer,
              links: linkContainer.links.filter (({ id }) => id !== action.linkID) 
            }
          }
          else {
            return linkContainer
          }
        })
    };

    case 'SET_DASHBOARDSTATE':
      return action.dashboardState

    default:
      return state;
  }
};
