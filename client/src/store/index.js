import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authModule from './modules/auth/index.js';
import ordersModule from './modules/orders/index.js';
import moviesModule from './modules/movies/index.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  modules: {
    movies: moviesModule,
    auth: authModule,
    orders: ordersModule
  }
})
