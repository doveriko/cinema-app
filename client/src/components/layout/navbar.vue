<template>
  <nav id="navbar">
      <div class="nav-home">
        <a href="/"><img :src="isMobileMode ? '/logo-mobile.PNG' : '/logo.PNG'" class="logo-title"></a>
      </div>
      <div class="nav-auth">
          <router-link to="/my-account" exact>
          <div class="icon-wrapper">
            <font-awesome-icon icon="user-circle"/>
            <span v-if="!isLoggedIn" class="hidden-text login">Log in</span>
            <span v-if="isLoggedIn" class="username">{{ username }}</span>
          </div>
          </router-link>
          <div class="icon-wrapper">
            <font-awesome-icon v-if="isLoggedIn" icon="sign-out-alt" alt="Log out" @click="destroySession"/>
            <span v-if="isLoggedIn" class="hidden-text logout" @click="destroySession">Log out</span>
          </div>
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
    async destroySession() {
      window.sessionStorage.clear();
      window.location.reload();
    },
  },
};
</script>

<style scoped>
#navbar {
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
}
a {
  text-decoration: none;
}
.nav-auth {
  display: flex;
  padding-top: 10px;
}
.username {
  margin-left: 5px;
  color: #f16b00;
  font-size: 15pt;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.fa-w-16 path {
    fill: #3a0061;
}
.fa-w-16 {
    font-size: 16pt
}
.login-text {
    color: #f16b00;
    font-size: 13pt;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-left: 5px;
    font-weight: bold;
}
.fa-sign-out-alt {
    margin-left: 1rem;
    cursor: pointer;
}
.icon-wrapper {
  height: min-content;
}
.icon-wrapper .hidden-text {
  display: none;
}
.icon-wrapper:hover .hidden-text {
  display: initial;
  visibility: visible;
}
.hidden-text.logout {
  cursor: pointer
}
.hidden-text {
      color: #f16b00;
    font-size: 13pt;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-left: 5px;
}
</style>
