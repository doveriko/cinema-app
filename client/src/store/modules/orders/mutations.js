export default {
    saveSession(state, payload) {
        state.sessionId = payload.sessionId,
        state.movieTitle = payload.movieTitle
        state.pendingOrder = true
    },
    saveUser(state, payload) {
        state.userId = payload.userId
    }
}