export default function deleteArticle(state = [], action) {
    if (action.type === 'ARTICLE_DELETE_ERROR') {
        if (typeof action.payload === 'undefined') {
            return state;
        } else {
            return action.payload;
        }
    }
    return state
}