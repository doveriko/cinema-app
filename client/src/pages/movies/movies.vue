<template>
  <div>
    <h1 class="section-header">MOVIES</h1>
    <div class="all-movies">
      <movie-item
        v-for="movie in movieList"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :imageUrl="movie.imageUrl"
      >
      </movie-item>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import movieItem from "../../components/movieItem.vue";

export default {
  components: { movieItem },
  data() {
    return {
      movieList: [],
    };
  },
  beforeMount() {
    this.loadMovies();
  },
  methods: {
    loadMovies() {
      axios
        .get(process.env.VUE_APP_API_URL + "/movies")
        .then((response) => {
          this.movieList = response.data;
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.all-movies {
    display: flex;
    flex-flow: wrap;
}

.card {
    flex-basis: 30%;
}</style>
