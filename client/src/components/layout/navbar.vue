<template>
  <nav id="navbar">
      <div class="nav-home">
        <router-link to="/" exact><img :src="isMobileMode ? '/logo-mobile.PNG' : '/logo.PNG'" class="logo-title"></router-link>
      </div>
      <div class="nav-auth">
          <router-link to="/my-account" exact>
            <font-awesome-icon icon="user-circle" class="login-icon"/>
            <span v-if="!isLoggedIn" class="login-text">Log in</span>
            <span v-if="isLoggedIn" class="username">{{ username }} | </span>
          </router-link>
            <font-awesome-icon v-if="isLoggedIn" icon="sign-out-alt" class="login-icon" @click="destroySession"/>
      </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'isMobileMode'
    ]),
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
#navbar {
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
.nav-auth {
  display: flex;
}

.username {
  margin: 0;
  color: #3a0061;
  font-size: 15pt;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.logout {
  color: #f16b00;
  font-size: 15pt;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

/* .logo-title a, .auth-link a {
    color: #fc8600;
    font-size: 15pt;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bolder;
}

.logo-title a {
  font-size: 20pt;
} */

.login-icon path {
    fill: #3a0061;
}

.login-icon {
    font-size: 16pt
}

.login-text {
    color: #f16b00;
    font-size: 13pt;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-left: 5px;
    font-weight: bold;
}

.not-auth-links {
    padding: 1em;
}

.not-auth-links a:hover .login-text {
  color: #3a0061
}

.not-auth-links a:hover .login-icon path {
    fill: orange;
}

</style>
