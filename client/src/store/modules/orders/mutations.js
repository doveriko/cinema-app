export default {
    saveSession(state, payload) {
        state.sessionId = payload.sessionId,
        state.pendingOrder = true
    },
    saveUser(state, payload) {
        state.userId = payload.userId
    }
}