import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { store } from './store/index';

// Axios config
import axios from 'axios';
import VueAxios from 'vue-axios';
// Insert token in requests to protected API endpoints (routes with auth middleware)
axios.interceptors.request.use(
  function(config) {
    const token = store.getters.token;
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

// Font Awesome installation
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faUserCircle, faTrashAlt, faCheck, faTimes, faTicketAlt, faFilm, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faSignOutAlt, faUserCircle, faTrashAlt, faCheck, faTimes, faTicketAlt, faFilm, faCalendarAlt);

// Register components
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
Vue.component('base-button', BaseButton);
Vue.component('base-card', BaseCard)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Use packages
Vue.use(VueRouter);

// Register routes
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

export default router;

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/movies');
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})