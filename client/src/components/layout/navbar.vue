<template>
  <nav>
    <ul>
      <div class="nav-home">
        <span class="logo-title"><router-link to="/" exact>CINE DE BARRIO</router-link></span>
      </div>
      <div class="nav-my-account">
        <li class="auth-button"><router-link to="/my-account" exact>My Account</router-link></li>
        <span v-if="isLoggedIn" class="username">| {{ username }} | </span>
        <span v-if="isLoggedIn" class="logout" @click="destroySession"> Log out</span>
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
      const redirectUrl = "/" + (this.$route.query.redirect || "auth");
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
  background: white;
  padding: 14px 0;
}
.router-link-active {
  background: #eee;
  color: #444;
}
.nav-my-account {
  display: flex;
}

.username {
  margin: 0;
  color: #3a0061;
  font-size: 15pt;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.logout {
  color: #fc8600;;
  font-size: 15pt;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.logo-title a, .auth-button a {
    color: #fc8600;
    font-size: 15pt;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bolder;
}

.logo-title a {
  font-size: 20pt;
}

</style>
