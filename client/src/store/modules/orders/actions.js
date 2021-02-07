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
        .post("http://localhost:3000" + `/users/${userId}/orders`,
          { userId, sessionId },
          { withCredentials: false }
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
        .get("http://localhost:3000" + `/users/${userId}/orders`)
        .then((response) => {
          allOrders = response.data.orders;
        })
        .catch((err) => console.log(err));

        console.log("all orders", allOrders);

        context.commit('loadOrders', allOrders);
    },
    updateOrders(context, data) {
      let updatedOrders = data;
      context.commit('updateOrders', updatedOrders)
    }
}