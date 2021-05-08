import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authModule from './modules/auth/index.js';
import ordersModule from './modules/orders/index.js';
import moviesModule from './modules/movies/index.js';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  modules: {
    movies: moviesModule,
    auth: authModule,
    orders: ordersModule
  },
  state() {
    return {
      isMobile : null,
      rooms: [{
        name: 'Jerezano',
        id: 1
      },
      {
        name: 'Lealas',
        id: 2
      },
      {
        name: 'Delicias',
        id: 3
      }]
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
    },
    getRooms(state) {
      return state.rooms
    }
  },
  actions: {
    registerRooms(context) {
      let allRooms = context.getters.getRooms;
  
      for (let i = 0; i < allRooms.length; i++) {
        var id = allRooms[i].id
        var name = allRooms[i].name
  
        axios
          .post(process.env.VUE_APP_API_URL + "/rooms",
            { id, name }
          )
          .then((response) => {
            console.log("rooms created", response.data);
          })
          .catch((err) => console.log(err));
      }
    },
  }
})
