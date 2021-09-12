export default {
    allOrders(state) {
        return state.allOrders;
    },
    currentOrder(state) {
        let order = {
            userId: state.userId,
            sessionId: state.sessionId,
            sessionTime: state.sessionTime,
            movieTitle: state.movieTitle,
            orderStatus: state.orderStatus,
            imageUrl: state.imageUrl,
            seats: state.seats,
            offsiteProducts: state.offsiteProducts,
            bookingCode: state.bookingCode
        }
        return order;
    }
}