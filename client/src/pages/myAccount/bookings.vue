<template>
  <div>
    <p>BOOKINGS</p>
    <!-- <li v-for="order in allOrders" :key="order.id">
          {{order.sessionId}}
        </li> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessionTime: [],
      movieTitle: [],
      date: [],
      hour: [],
    };
  },
  created() {
    this.loadOrders();
  },
  beforeMount() {
    this.formatData();
  },
  mounted() {
    console.log("Movie titles", this.movieTitle);
    console.log("Session Time", this.sessionTime);
    console.log("Date", this.date);
    console.log("Hour", this.hour);
  },
  methods: {
    loadOrders() {
      this.$store.dispatch("loadOrders");
      let allOrders = this.$store.getters.allOrders;
      var self = this;
      allOrders.map((order) => {
        self.sessionTime.push(order.session.time);
        self.movieTitle.push(order.session.movie.title);
      });
    },
    formatData() {
      var self = this;
      this.sessionTime.map((timeStr) => {
        let day = timeStr.slice(8, 10);
        let month = timeStr.slice(5, 7);
        let year = timeStr.slice(0, 4);
        let dateFormatted = day + '/' + month + '/' + year;
        self.date.push(dateFormatted);
        self.hour.push(timeStr.slice(11, 16));
      })
    },
  },
  computed: {
    sessionDates() {
      return this.date;
    },
    sessionHours() {
      return this.hour;
    },
    movieTitles() {
      return this.movieTitle;
    }
  },
};
</script>

<style>
</style>