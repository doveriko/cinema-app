<template>
  <div>
    <p>MOVIE DETAILS</p>
    <p></p>
    <!-- <filters-bar v-for="session in sessions" :key="session.id" :time="session.time"></filters-bar> -->
    <filters-bar :sessions="sessions" :title="title" @save-session="saveSession" ></filters-bar>
  </div>
</template>

<script>
import axios from "axios";
import filtersBar from '../../components/filtersBar.vue';

export default {
  data() {
    return {
      id: this.$route.params.id,
      selectedMovie: {},
    };
  },
  components: { filtersBar },
  computed: {
    sessions() {
      return this.selectedMovie.sessions
    },
    title() {
      return this.selectedMovie.title
    }
  },
  created() {
    this.loadMovie();
  },
  methods: {
    loadMovie() {
      axios
        .get("http://localhost:3000" + "/movies/" + this.id, {
          withCredentials: false,
        })
        .then((response) => {
          this.selectedMovie = response.data;
          console.log("TU PELI", this.selectedMovie);
        })
        .catch((err) => console.log(err));
      

    },
    saveSession(data) {
      this.$store.dispatch('saveSession', data);
      // this.$store.dispatch('orders/saveOrder', data);
    }
  },
};
</script>

<style>
</style>