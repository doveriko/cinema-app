import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { store } from './store/index';

// Register components
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
Vue.component('base-button', BaseButton);
Vue.component('base-card', BaseCard)

// Use packages
Vue.use(VueRouter);

// Register routes
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

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