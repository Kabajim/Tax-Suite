// Sidebar Reducer

const sidebarReducerDefaultState = {open: false, editable: false};

export default (state = sidebarReducerDefaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_OPEN':
      return {
        ...state,
        open: !state.open
      }
    case 'TOGGLE_EDITABLE':
      return {
        ...state,
        editable: !state.editable
      };
    default:
      return state;
  }
};
