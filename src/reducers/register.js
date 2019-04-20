export default function register(state = null, action) {
    if (action.type === 'REGISTER_ERROR') {
        return state = JSON.parse(action.payload);
    }
    return state
}