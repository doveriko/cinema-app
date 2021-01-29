import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authModule from './modules/auth/index.js';
import ordersModule from './modules/orders/index.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
})],
  modules: {
    auth: authModule,
    orders: ordersModule
  },
  state() {
    return {
      oigaId: '1'
    };
  },
  getters: {
    chaveaId(state) {
      // const userId = context.rootGetters.userId;
      return state.oigaId;
    }
  }
})
