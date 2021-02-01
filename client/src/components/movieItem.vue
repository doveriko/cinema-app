<template>
  <div>
    <base-card>
      <h3>{{ title }}</h3>
      <img :src="imageUrl" />
      <base-button link :to="movieDetails">+ info</base-button>
    </base-card>
  </div>
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

<style></style>
