export default function auth(state = null, action) {
    if (action.type === 'LOGIN_ERROR') {
        return state = action.payload;
    }
    return state
}