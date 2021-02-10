<template>
  <div>
    <p>MOVIES</p>
    <base-card>
      <movie-item
        v-for="movie in movieList"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :imageUrl="movie.imageUrl"
      >
      </movie-item>
    </base-card>
  </div>
</template>

<script>
// import axios from 'axios';
import movieItem from '../../components/movieItem.vue';

export default {
  components: { movieItem },
  data() {
    return {
      movieList: []
    }
  },
  mounted() {
    this.registerMovies();
    // this.loadMovies();
  },
  methods: {
    registerMovies() {
      this.$store.dispatch("registerMovies");
    },
    // loadMovies() {
    //   axios
    //     .get(process.env.VUE_APP_API_URL + '/movies')
    //     .then(response => {
    //       this.movieList = response.data;
    //       console.log(response.data);
    //     })
    //     .catch(err => console.log(err));
    // }
  }
};
</script>

<style></style>
