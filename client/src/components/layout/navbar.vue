<template>
  <nav id="navbar">
      <div class="nav-home">
        <a href="/"><img :src="isMobileMode ? '/logo-mobile.PNG' : '/logo.PNG'" class="logo-title"></a>
      </div>
      <div class="nav-auth">
          <router-link to="/my-account" exact>
          <div class="icon-wrapper">
            <font-awesome-icon icon="user-circle"/>
            <span v-if="!isAuthenticated" class="hidden-text login">Log in</span>
            <span v-else class="username" v-html="userName"></span>
          </div>
          </router-link>
          <div class="icon-wrapper">
            <font-awesome-icon v-if="isAuthenticated" icon="sign-out-alt" alt="Log out" @click="destroySession"/>
            <span v-if="isAuthenticated" class="hidden-text logout" @click="destroySession">Log out</span>
          </div>
      </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'isMobileMode',
      'isAuthenticated',
      'userName'
    ])
  },
  methods: {
    ...mapActions([
      'cancelOrder',
      'clearSession'
    ]),
    async destroySession() {
      await this.cancelOrder()
      await this.clearSession()
      this.$router.push({ path: '/'})
    },
  },
};
</script>

<style scoped lang="scss">
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
  color: $base-secondary-color;
  font-size: 15pt;
  font-family: $base-font-family;
}
.fa-w-16 {
  font-size: 16pt;
  path {
    fill: $base-color;
  }
}
.login-text {
    color: $base-secondary-color;
    font-size: 13pt;
    font-family: $base-font-family;
    margin-left: 5px;
    font-weight: bold;
}
.fa-sign-out-alt {
    margin-left: 1rem;
    cursor: pointer;
}
.icon-wrapper {
  height: min-content;

  .hidden-text {
    display: none;
    color: $base-secondary-color;
    font-size: 13pt;
    font-family: $base-font-family;
    margin-left: 5px;
    &.logout {
      cursor: pointer
    }
  }

  &:hover .hidden-text {
    display: initial;
    visibility: visible;
  }
}
</style>
