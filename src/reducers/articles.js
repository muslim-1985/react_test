export default function fetchUsersReducer (state=[], action) {
    if(action.type === 'GET_ARTICLES') {
        if (typeof action.payload === 'undefined') {
            return state;
        } else {
            return action.payload.articles;
        }
    } else if (action.type === 'ADD_ARTICLE') {
        return action.payload;

    } else if (action.type === 'DELETE_ARTICLE') {
        return action.payload;
    }
    return state
}