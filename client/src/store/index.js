import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authModule from './modules/auth/index.js';
import ordersModule from './modules/orders/index.js';
import moviesModule from './modules/movies/index.js';
import roomsModule from './modules/rooms/index.js';
import offsiteProductsModule from './modules/offsiteProducts/index.js';
import seedModule from './modules/seed/index.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  modules: {
    auth: authModule,
    orders: ordersModule,
    movies: moviesModule,
    rooms: roomsModule,
    offsiteProducts: offsiteProductsModule,
    seed: seedModule,
  },
  state() {
    return {
      isMobile : null
    }
  },
  mutations: {
    isMobile(state, payload) {
      state.isMobile = payload
    }
  },
  getters: {
    isMobileMode(state) {
      return state.isMobile
    }
  }
})
