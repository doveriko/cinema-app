<template>
  <p>MOVIE DETAILS</p>
</template>

<script>
import axios from 'axios';

export default {

  data() {
    return {
      id: this.$route.params.id,
      selectedMovie: null
    }
  },
  created() {
    this.loadMovie();
  },
  methods: {
    loadMovie() {
      axios
        .get('http://localhost:3000' + '/movies/' + this.id, { withCredentials: false })
        .then(response => {
          this.selectedMovie = response.data;
          console.log(this.selectedMovie);
        })
        .catch(err => console.log(err));
      }
    },
}
</script>

<style>

</style>