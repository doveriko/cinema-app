<template>
  <div>
    <h1 class="section-header" :class="{'filter-applied': filterApplied}">MOVIES</h1>

    <div class="filters" v-if="!filterApplied">
      <filter-title :allMovies="allMovies" @filtered-title="filteredTitle"></filter-title>
      <filter-room :allRooms="allRooms" @filtered-room="filteredRoom" ></filter-room>
    </div>

    <div class="remove-filters" v-if="filterApplied">
      <div class="remove-button" @click="resetFilters">Remove filters</div>
    </div>

    <div v-if="filterApplied && selectedMovieTitle">
      <movie-details :selectedMovieId="selectedMovieId"></movie-details>
    </div>
    <div v-if="filterApplied && selectedRoomName" >
      <h1 class="section-header">Cine {{selectedRoomName}}</h1>
      <div class="all-movies">
        <movie-item
          v-for="movie in filteredMovieList"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :imageUrl="movie.imageUrl"
        >
        </movie-item>
      </div>
    </div>

    <div class="all-movies" v-if="!filterApplied">
      <movie-item
        v-for="movie in allMovies"
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
import movieItem from "../../components/movieItem.vue";
import MovieDetails from './movieDetails.vue';
import filterTitle from "../../components/filterTitle";
import FilterRoom from '../../components/filterRoom.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { movieItem, filterTitle, FilterRoom, MovieDetails },
  data() {
    return {
      filterApplied: false,
      selectedMovieTitle: null,
      selectedMovieId: null,
      selectedRoomName: null,
      selectedRoomId: null,
      filteredMovieList: []
    };
  },
  computed: {
    ...mapGetters([
      'allMovies',
      'allRooms'
    ]),
  },
  methods: {
    ...mapActions(['loadMovies', 'loadRooms']),
    filteredTitle(data) {
      this.selectedMovieId = data.id
      this.selectedMovieTitle = data.title
      this.filterApplied = data.filterApplied
    },
    filteredRoom(data) {
      this.selectedRoomId = data.id
      this.selectedRoomName = data.name
      this.filterApplied = data.filterApplied
      this.filterMoviesInRoom()
    },
    resetFilters() {
      this.filterApplied = false,
      this.selectedMovieTitle = null,
      this.selectedMovieId = null,
      this.selectedRoomName = null,
      this.selectedRoomId = null,
      this.filteredMovieList = []
    },
    filterMoviesInRoom() {
      // 1. Iterate over movies
      let moviesInRoom = this.allMovies.map((movie) => {
        // 2. Copy array & filter movies with sessions assigned to selected room
        return {...movie, sessions: movie.sessions.filter((session) => session.roomId == this.selectedRoomId)}
      })
      // 3. Remove movies without sessions assigned to selected room
      this.filteredMovieList = moviesInRoom.filter(movies => movies.sessions.length)
    }
  },
  created() {
    this.loadMovies();
    this.loadRooms();
  }
};
</script>

<style lang="scss">

.all-movies {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
}
.card {
    flex-basis: 30%;
}
.mobile .movie-img {
    width: 280px;
    height: auto
}
.mobile .all-movies .card {
    margin: 20px;
}
@media(min-width: 1200px) {
  .all-movies {
    width: 80%;
    margin: 0 auto;
  }
}
.filters, .remove-filters {
    display: flex;
    justify-content: center;
}

.filter-title select, .filter-room select {
    width: 180px;
    margin: 10px;
    padding: 10px 18px;
    color: $base-color;
    border-radius: 20px;
    background: #fff;
    border: 1px solid #ccc;
    font-size: 16px;
    font-family: $base-font-family;
    cursor: pointer
}

.remove-button {
    margin: 10px;
    padding: 10px 18px;
    color: #b90012;
    border-radius: 20px;
    background: #fff;
    border: 1px solid #b90012;
    font-size: 16px;
    font-family: $base-font-family;
    cursor: pointer;
}

.remove-button:hover {
    background: #ffd1d5;
}

.section-header.filter-applied {
    display: none;
}
</style>
