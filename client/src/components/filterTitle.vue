<template>
  <div class="filter-title">
    <select @change="selectedTitle()" v-model="movie">
      <option value="" disabled selected>Filter by title</option>
      <option v-for="(movie, i) in allMovies" :key="i" :value="movie">{{movie.title}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    allMovies: {
      type: Array
    }
  },
  data() {
    return {
      movie: ""
    };
  },
  methods: {
    selectedTitle() {
      let data = {
        id: this.movie.id,
        title : this.movie.title,
        filterApplied : true
      }
      this.$emit("filtered-title", data);
      this.movie = ''
    }
  },
};
</script>

<style scoped>

</style>