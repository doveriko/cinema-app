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
import { mapGetters, mapActions } from 'vuex';

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
  },
  methods: {
    ...mapActions([
      'registerRooms',
      'registerMovies',
      'registerSessions',
      'registerSeats',
      'registerOffsiteProducts'
      ]),
  },
  async created() {
    // await this.registerMovies();
    // await this.registerRooms();
    // await this.registerSessions();
    // await this.registerSeats();
    // await this.registerOffsiteProducts()
  }
};
</script>

<style>
.mobile {
    margin-bottom: 3rem;
}
.swal2-container {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
main {
  margin-bottom: 5rem
}
</style>
