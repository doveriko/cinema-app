<template>
  <div>
    <h1>CHECKOUT</h1>

    <h3>Booking details:</h3>
    <div>{{ movieTitle }}</div>
    <div>{{ day }}/{{ month }}/{{ year }} at {{ hour }}</div>

    <div v-if="this.orderStatus == 'pending'">
      <p>Complete order?</p>
      <button @click="completeOrder">COMPLETE</button>
    </div>

    <div v-if="this.orderStatus == 'completed'">
      <h1>ARSA!!</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: "",
      month: "",
      year: "",
      hour: "",
    };
  },
  beforeCreate() {
    if(this.$store.state.orders.orderStatus == "inactive") {
      this.$router.replace("/my-account");
    }
  },
  computed: {
    movieTitle() {
      return this.$store.state.orders.movieTitle;
    },
    orderStatus() {
      return this.$store.state.orders.orderStatus;
    },
  },
  created() {
    this.sessionTime();
  },
  methods: {
    sessionTime() {
      let sessionTime = this.$store.state.orders.sessionTime;
      this.day = sessionTime.slice(8, 10);
      this.month = sessionTime.slice(5, 7);
      this.year = sessionTime.slice(0, 4);
      this.hour = sessionTime.slice(11, 16);
    },
    completeOrder() {
      let userId = this.$store.state.auth.userId;
      let sessionId = this.$store.state.orders.sessionId;

      const order = {
        userId: userId,
        sessionId: sessionId,
      };
      this.$store.dispatch("registerOrder", order);
    },
  },
};
</script>

<style>
</style>