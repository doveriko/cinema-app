export default {
    saveSession(state, payload) {
        state.sessionId = payload.sessionId
    },
    saveUser(state, payload) {
        state.userId = payload.userId
    }
}