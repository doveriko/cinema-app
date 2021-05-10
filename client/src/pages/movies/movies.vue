<template>
  <div>
    <h1 class="section-header">MOVIES</h1>

    <div class="filters" v-show="!filterApplied">
      <filter-title :allMovies="allMovies" @filtered-title="filteredTitle"></filter-title>
      <filter-room :allRooms="allRooms" @filtered-room="filteredRoom" ></filter-room>
    </div>

    <div class="remove-filters" v-show="filterApplied && !selectedMovieTitle">
      <div class="remove-button" @click="resetFilters">Remove filters</div>
    </div>

    <div v-if="filterApplied && selectedMovieTitle">
      <movie-details :selectedMovieId="selectedMovieId"></movie-details>
    </div>
    <div v-if="filterApplied && selectedRoomName">
      {{this.selectedRoomName}}
      <!-- <movie-item
        v-for="movie in filteredMovieList"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :imageUrl="movie.imageUrl"
      >
      </movie-item> -->
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
import { mapGetters } from 'vuex';

export default {
  components: { movieItem, filterTitle, FilterRoom, MovieDetails },
  data() {
    return {
      filterApplied: false,
      selectedMovieTitle: null,
      selectedMovieId: null,
      selectedRoomName: null,
      selectedRoomId: null
    };
  },
  computed: {
    ...mapGetters([
      'allMovies',
      'allRooms'
    ]),
  },
  methods: {
    filteredTitle(data) {
      this.selectedMovieId = data.id
      this.selectedMovieTitle = data.title
      this.filterApplied = data.filterApplied

      console.log("filtered movie data in movies component",
      this.selectedMovieId,
      this.selectedMovieTitle,
      this.filterApplied
      );
    },
    filteredRoom(data) {
      this.selectedRoomId = data.id
      this.selectedRoomName = data.name
      this.filterApplied = data.filterApplied

      console.log("filtered room data in movies component",
      this.selectedRoomId,
      this.selectedRoomName,
      this.filterApplied
      );
    },
    resetFilters() {
      this.filterApplied = false,
      this.selectedMovieTitle = null,
      this.selectedMovieId = null,
      this.selectedRoomName = null,
      this.selectedRoomId = null
    }
  }
};
</script>

<style>
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
    color: #3a0061;
    border-radius: 20px;
    background: #fff;
    border: 1px solid #ccc;
    font-size: 16px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    cursor: pointer;
}

.remove-button:hover {
    background: #ffd1d5;
}
</style>
