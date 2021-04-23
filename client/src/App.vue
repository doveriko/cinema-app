<template>
  <div>
    <app-navbar></app-navbar>
    <main :class="{ mobile: isMobileMode }">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import navbar from "./components/layout/navbar.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    "app-navbar": navbar,
  },
  data() {
    return {
      windowWidth: window.innerWidth
      }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      this.$store.commit("isMobile", this.isMobile);
    })
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 768
    },
    ...mapGetters([
      'isMobileMode'
    ]),
  }
  // created() {
  //   this.registerMovies();
  //   this.registerSessions();
  // },
  // methods: {
  //   registerMovies() {
  //     this.$store.dispatch("registerMovies");
  //   },
  //   registerSessions() {
  //     this.$store.dispatch("registerSessions");
  //   }
  // }
};
</script>

<style>
</style>
