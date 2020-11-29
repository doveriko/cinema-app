import movies from './pages/movies/movies.vue';
import movieDetails from './pages/movies/movieDetails.vue';
import userAuth from './pages/auth/userAuth.vue';
import checkout from './pages/checkout.vue';
import myAccount from './pages/myAccount/myAccount.vue';
import notFound from './pages/notFound.vue'

export default [
    { path: '/', redirect: '/movies' },
    { path: '/movies', component: movies },
    { path: '/movies/:id', component: movieDetails },
    { path: '/auth', component: userAuth },
    { path: '/checkout', component: checkout },
    { path: '/my-account', component: myAccount },
    { path: '/:notFound(.*)', component: notFound }
]
