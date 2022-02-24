<template>
  <div id="cinedebarrio" :class="{ 'mobile': isMobileMode }">
    <app-navbar></app-navbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import navbar from "./components/layout/navbar.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    "app-navbar": navbar,
  },
  data() {
    return {
      screenBreakMobile : 768
    };
  },
  computed: {
    ...mapGetters(['isMobileMode'])
  },
  methods: {
    ...mapActions([
      "registerRooms",
      "registerMovies",
      "registerSessions",
      "registerSeats",
      "registerOffsiteProducts",
    ]),
    ...mapMutations(['calcDisplay']),
    handleScreenResize() {
      let isMobile = window.innerWidth <= this.screenBreakMobile 
      this.calcDisplay(isMobile);
    },
    async seedDatabase() {
      await this.registerMovies();
      await this.registerRooms();
      await this.registerSessions();
      await this.registerSeats();
      await this.registerOffsiteProducts();
    }
  },
  created() {
    window.addEventListener('resize', this.handleScreenResize)
    this.handleScreenResize();

    // this.seedDatabase();
  }
};
</script>

<style>
.mobile {
  margin-bottom: 3rem;
}
.swal2-container {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
main {
  margin-bottom: 5rem;
}
</style>
