export default {
    saveOrder(state, payload) {
        state.userId = payload.userId,
        state.sessionId = payload.sessionId
    }
}