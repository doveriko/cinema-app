export default {
    saveOrder(state, payload) {
        state.sessionId = payload.sessionId,
        state.sessionTime = payload.sessionTime,
        state.movieTitle = payload.movieTitle,
        state.imageUrl = payload.imageUrl,
        state.seats = payload.seats,
        state.offsiteProducts = payload.offsiteProducts,
        state.orderStatus = "pending"
    },
    registerOrder(state, payload) {
        state.userId = payload.userId,
        state.bookingCode = payload.bookingCode,
        state.orderStatus = "completed"
    },
    cancelOrder(state, payload) {
        state.sessionId = payload.sessionId,
        state.sessionTime = payload.sessionTime,
        state.movieTitle = payload.movieTitle,
        state.imageUrl = "",
        state.orderStatus = payload.orderStatus,
        state.seats = payload.seats,
        state.offsiteProducts = payload.offsiteProducts
    },
    loadOrders(state, payload) {
        state.allOrders = payload
    },
    updateOrders(state, payload) {
        state.allOrders = payload
    }
}