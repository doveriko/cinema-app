import axios from 'axios';

export default {
    state() {
        return {
            movies: [],
            selectedMovie: {}
        };
    },
    actions: {
        async loadMovies(context) {
            await axios
                .get(process.env.VUE_APP_API_URL + "/movies")
                .then((response) => {
                    let allMovies = []
                    allMovies = response.data
                    context.commit('loadMovies', allMovies)
                    })
                .catch((err) => console.log(err));
                
        },
        // getOneMovie(context, data) {
        //     let movieId = data
        //     let allMovies = context.getters.allMovies
        //     let selectedMovie = allMovies.filter(movie => movie.id == movieId)
        //     context.commit('selectMovie', selectedMovie[0])
        // },
    },
    mutations: {
        loadMovies(state, payload) {
            state.movies = payload
        },
        selectMovie(state, payload) {
            state.selectedMovie = payload
        }
    },
    getters: {
        allMovies(state) {
            return state.movies;
        },
        oneMovie: (state) => (id) => {
            return state.movies.find(movie => movie.id == id);
        }
    }
};