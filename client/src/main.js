import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './routes';
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
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')