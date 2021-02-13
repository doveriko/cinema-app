import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { store } from './store/index';

// Axios default config
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.headers.common = {'Authorization': `bearer ${store.getters.token}`};
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

// Font Awesome installation
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faSignOutAlt, faUserCircle);

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