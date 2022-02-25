<template>
    <base-card>
      <h3 class="movie-title">{{ title }}</h3>
      <img class="movie-img" :src="imageUrl" />
      <base-button link :to="movieDetails">+ info</base-button>
    </base-card>
</template>

<script>

export default {
  props: ['id', 'title', 'imageUrl'],
  computed: {
    movieDetails() {
      return this.$route.path + '/' + this.id;
    }
  }
};
</script>

<style lang="scss">
img.movie-img {
    display: flex;
    margin: 0 auto;
    height: 300px;
}
h3.movie-title {
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 16pt;
    color: $base-color;
}
</style>
