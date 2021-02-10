import axios from 'axios';

export default {
    saveSession(context, data) {
        let session = {
            sessionId: data.sessionId,
            sessionTime: data.sessionTime,
            movieTitle: data.movieTitle
        }
        context.commit('saveSession', session)
    },
    registerOrder(context, data) {
        let newOrder = {
            userId: context.getters.userId,
            sessionId: data.sessionId
        }

        let { userId, sessionId } = newOrder;

        axios
        .post(process.env.VUE_APP_API_URL + `/users/${userId}/orders`,
          { userId, sessionId }
        )
        .then(() => {
          context.commit('registerOrder', newOrder);
        })
        .catch((err) => console.log(err));
    },
    cancelOrder(context, data) {
        let resetOrder = {
            userId : data.userId,
            sessionId : data.sessionId,
            sessionTime : data.sessionTime,
            movieTitle : data.movieTitle,
            orderStatus : data.orderStatus
          }
        
        context.commit('cancelOrder', resetOrder)
    },
    async loadOrders(context) {
        let userId = context.getters.userId;
        let allOrders = [];

        await axios
        .get(process.env.VUE_APP_API_URL + `/users/${userId}/orders`)
        .then((response) => {
          allOrders = response.data.orders;
        })
        .catch((err) => console.log(err));
        
        context.commit('loadOrders', allOrders);
    },
    deleteOrder(context, data) {
      let orderId = data;
      axios
      .delete(process.env.VUE_APP_API_URL + `/users/orders/${orderId}`)
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