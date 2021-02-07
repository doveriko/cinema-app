import movies from './pages/movies/movies.vue';
import movieDetails from './pages/movies/movieDetails.vue';
import userAuth from './pages/auth/userAuth.vue';
import checkout from './pages/checkout.vue';
import myAccount from './pages/myAccount.vue';
import notFound from './pages/notFound.vue';

export default [
    { path: '/', redirect: '/movies' },
    { path: '/movies', component: movies },
    { path: '/movies/:id', component: movieDetails },
    { path: '/auth', component: userAuth, meta: { requiresUnauth: true } },
    { path: '/checkout', component: checkout, meta: { requiresAuth: true } },
    { path: '/my-account', component: myAccount, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)', component: notFound }
]