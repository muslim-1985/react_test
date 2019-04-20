export default function fetchArticle (state=[], action) {
    if(action.type === 'ARTICLE') {
        if (typeof action.payload === 'undefined') {
            return state;
        } else {
            return action.payload.article;
        }
    } else if (action.type === 'ADD_ARTICLE') {
        return action.payload;

    } else if (action.type === 'DELETE_ARTICLE') {
        return action.payload;
    }
    return state
}