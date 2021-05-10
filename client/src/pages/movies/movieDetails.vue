<template>
  <div>
    <h1 class="section-header">{{title}}</h1>
      <div class="movie-details">
        <div class="movie-cover">
          <img class="movie-img" :src="imageUrl" />
        </div>
        <div class="movie-sessions">
          <p class="movie-description">{{description}}</p>
          <filter-session :sessions="sessions" :title="title" :imageUrl="imageUrl" @save-session="saveSession" ></filter-session>
        </div>
      </div>
  </div>
</template>

<script>
import filterSession from '../../components/filterSession.vue';
import axios from 'axios';

export default {
  props: ['selectedMovieId'],
  data() {
    return {
      id: this.$route.params.id || this.selectedMovieId,
      selectedMovie: {},
    };
  },
  components: { filterSession },
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
    if (this.id === this.selectedMovieId) {
      this.selectedMovie = this.$store.getters.oneMovie(this.id)
    } else {
      this.loadMovie();
    }
  },
  methods: {
    loadMovie() {
      axios
        .get(process.env.VUE_APP_API_URL + "/movies/" + this.id)
        .then((response) => {
          this.selectedMovie = response.data;
          console.log("arsa", this.selectedMovie);
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
    padding-right: 2em;
}
.mobile .movie-cover {
    padding-right: 0;
}
.movie-sessions {
    flex-basis: 50%;
}
p.movie-description {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: justify;
}
.mobile .movie-details {
    flex-direction: column;
    padding: 0 1em;
}
.mobile #filters select {
    width: 100%;
}
.mobile #filters form {
    padding: 10px 0;
}
</style>