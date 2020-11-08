import movies from './components/movies.vue';
import movieDetails from './components/movieDetails.vue';
import signup from './components/auth/signup.vue';
import login from './components/auth/login.vue';
import checkout from './components/checkout.vue';
import myAccount from './components/myAccount/myAccount.vue';
import notFound from './components/notFound.vue'

export default [
    { path: '/', redirect: '/movies' },
    { path: '/movies', component: movies },
    { path: '/movies/:id', component: movieDetails },
    { path: '/signup', component: signup },
    { path: '/login', component: login },
    { path: '/checkout', component: checkout },
    { path: '/my-account', component: myAccount },
    { path: '/:notFound(.*)', component: notFound }
]
