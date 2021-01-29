<template>
  <div>
    <h3>Profile</h3>
    <button @click="destroySession">LOG OUT</button>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {  
    destroySession() {
      window.sessionStorage.clear();
      const redirectUrl = "/" + (this.$route.query.redirect || "movies");
      this.$router.replace(redirectUrl);
      window.location.reload();
    }   
  },
};
</script>

<style>
</style>