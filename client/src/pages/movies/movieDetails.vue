<template>
  <div>
    <p>MOVIE DETAILS</p>
    <p>{{title}}</p>
    <p>{{description}}</p>
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
    },
    description() {
      return this.selectedMovie.description
    }
  },
  created() {
    this.loadMovie();
  },
  methods: {
    loadMovie() {
      axios
        .get(process.env.VUE_APP_API_URL + "/movies/" + this.id)
        .then((response) => {
          this.selectedMovie = response.data;
        })
        .catch((err) => console.log(err));
    },
    saveSession(data) {
      this.$store.dispatch('saveSession', data);
    }
  },
};
</script>

<style>
</style>