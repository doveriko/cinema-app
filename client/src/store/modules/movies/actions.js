import axios from 'axios';

export default {
    registerMovies(context) {
        let allMovies = context.getters.allMovies

        axios
        .post(process.env.VUE_APP_API_URL + '/movies',
          { allMovies }
        )
        .then((response) => {
          console.log("sus pelis", response.data);
        })
        .catch((err) => console.log(err));

        context.commit('tu', allMovies)
    }
}