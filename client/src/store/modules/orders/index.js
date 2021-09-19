import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state() {
      return {
        sessionId: null,
        sessionTime: "",
        movieTitle: "",
        orderStatus: "inactive",
        imageUrl: "",
        seats: [],
        allOrders: [],
        offsiteProducts: [],
        bookingCode: null
      };
    },
    mutations,
    actions,
    getters
  };