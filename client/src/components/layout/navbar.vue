<template>
  <nav>
    <ul>
      <div class="nav-home">
        <li><router-link to="/" exact>Movies</router-link></li>
      </div>
      <div class="nav-my-account">
        <li><router-link to="/my-account" exact>My Account</router-link></li>
        <p v-if="isLoggedIn" class="username">{{ username }}</p>
        <a v-if="isLoggedIn" @click="destroySession">LOG OUT</a>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.state.auth.name;
    },
  },
  methods: {
    destroySession() {
      window.sessionStorage.clear();
      const redirectUrl = "/" + (this.$route.query.redirect || "movies");
      this.$router.replace(redirectUrl);
      window.location.reload();
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
}
nav {
  background: #444;
  padding: 14px 0;
  margin-bottom: 40px;
}
.router-link-active {
  background: #eee;
  color: #444;
}
.nav-my-account {
  display: flex;
}

p.username {
  margin: 0;
  color: lightsalmon;
}
</style>
