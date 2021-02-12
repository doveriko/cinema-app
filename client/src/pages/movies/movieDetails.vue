<template>
  <div>
    <h1 class="section-header">{{title}}</h1>
      <div class="movie-details">
        <div class="movie-cover">
          <img class="movie-img" :src="imageUrl" />
        </div>
        <div class="movie-sessions">
          <p class="movie-description">{{description}}</p>
          <filters-bar :sessions="sessions" :title="title" @save-session="saveSession" ></filters-bar>
        </div>
      </div>
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
    },
    imageUrl() {
      return this.selectedMovie.imageUrl
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
.movie-details {
    display: flex;
    justify-content: center
}
.movie-cover {
    flex-basis: 20%;
}
.movie-sessions {
    flex-basis: 50%;
}
p.movie-description {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: justify;
}
</style>