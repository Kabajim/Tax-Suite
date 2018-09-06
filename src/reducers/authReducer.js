export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ID: action.uid,
                name: action.displayName,
                email: action.email,
                image: action.photoURL
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}