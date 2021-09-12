import axios from 'axios';

export default {
    saveOrder(context, data) {
        let orderInfo = {
            sessionId: data.sessionId,
            sessionTime: data.sessionTime,
            movieTitle: data.movieTitle,
            imageUrl: data.imageUrl,
            seats: data.seats,
            offsiteProducts: data.offsiteProducts
        }
        context.commit('saveOrder', orderInfo)
    },
    registerOrder(context, data) {
        let newOrder = {
            userId: context.getters.userId,
            sessionId: data.sessionId,
            seats: data.seats,
            offsiteProducts: data.offsiteProducts,
            bookingCode: data.bookingCode
        }

        let { userId, sessionId, seats, offsiteProducts, bookingCode } = newOrder;

        axios
        .post(process.env.VUE_APP_API_URL + `/orders/${userId}`,
          { userId, sessionId, seats, offsiteProducts, bookingCode }
        )
        .then(response => response.data)
        .then(context.commit('registerOrder', newOrder))
        .catch((err) => console.log(err));        
    },
    cancelOrder(context, data) {
        let resetOrder = {
            userId : data.userId,
            sessionId : data.sessionId,
            sessionTime : data.sessionTime,
            movieTitle : data.movieTitle,
            orderStatus : data.orderStatus,
            seats: data.seats,
            offsiteProducts: data.offsiteProducts
          }
        
        context.commit('cancelOrder', resetOrder)
    },
    async loadOrders(context) {
        let userId = context.getters.userId;
        
        await axios
        .get(process.env.VUE_APP_API_URL + `/orders/${userId}`)
        .then((response) => {
          let allOrders = [];
          allOrders = response.data.orders;
          context.commit('loadOrders', allOrders);
        })
        .catch((err) => console.log(err));        
    },
    deleteOrder(context, data) {
      let orderId = data;
      axios
      .delete(process.env.VUE_APP_API_URL + `/orders/${orderId}`)
      .then(() => {
        let deletedOrderId = orderId;
        let allOrders = this.$store.getters.allOrders;
        let updatedOrders = allOrders.filter(
          (order) => order.id != deletedOrderId
        );
        context.commit('updateOrders', updatedOrders)
      })
      .catch((err) => console.log(err));
    }
}