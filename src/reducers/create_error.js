export default function createError(state = null, action) {
    if (action.type === 'CREATE_ERROR') {
        if (typeof action.payload === 'undefined') {
            return state;
        }
        return state
    }
    return state
}