export default {
    saveOrder(state, payload) {
        state.sessionId = payload.sessionId,
        state.sessionTime = payload.sessionTime,
        state.movieTitle = payload.movieTitle,
        state.imageUrl = payload.imageUrl,
        state.seats = payload.seats,
        state.orderStatus = "pending"
    },
    registerOrder(state, payload) {
        state.userId = payload.userId,
        state.sessionId = payload.sessionId,
        state.orderStatus = "completed"
    },
    cancelOrder(state, payload) {
        state.userId = payload.userId,
        state.sessionId = payload.sessionId,
        state.sessionTime = payload.sessionTime,
        state.movieTitle = payload.movieTitle,
        state.imageUrl = "",
        state.orderStatus = payload.orderStatus
    },
    loadOrders(state, payload) {
        state.allOrders = payload
    },
    updateOrders(state, payload) {
        state.allOrders = payload
    }
}