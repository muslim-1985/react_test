export default function editError(state = null, action) {
    if (action.type === 'UPDATE_ERROR') {
        if (typeof action.payload === 'undefined') {
            return state;
        }
        return state
    }
    return state
}