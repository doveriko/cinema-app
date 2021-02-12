<template>
  <div>
    <h1 class="section-header">CHECKOUT</h1>

    <h3>Booking details:</h3>
    <div>{{ movieTitle }}</div>
    <div>{{ day }}/{{ month }}/{{ year }} at {{ hour }}</div>

    <div v-if="this.orderStatus == 'pending'">
      <p>Complete order?</p>
      <button @click="completeOrder">COMPLETE</button>
      <button @click="cancelOrder">CANCEL</button>
    </div>

    <div v-if="this.orderStatus == 'completed'" class="order-completed">
      <h3>Booking completed!</h3>
      <p>You will receive an e-mail shortly with the reference number to show at the box office</p>

      <base-button link :to="myAccount">Go to My Account</base-button>
      <!-- <router-link to="/my-account" tag="button">Go to My Account</router-link> -->
    </div>

    <div v-if="this.orderStatus == 'inactive'">
      <p>Your booking has been cancelled. You will be redirected to the home page</p>
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
    if(this.$store.state.orders.orderStatus != "pending") {
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
    myAccount() {
      return 'my-account';
    }
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
      let sessionId = this.$store.state.orders.sessionId;

      let order = {
        sessionId : sessionId,
      };
      this.$store.dispatch("registerOrder", order);
      this.$store.dispatch("loadOrders");
    },
    cancelOrder() {
      let resetOrder = {
        userId : null,
        sessionId : null,
        sessionTime : "",
        movieTitle : "",
        orderStatus : "inactive"
      }
      this.$store.dispatch("cancelOrder", resetOrder);
      setTimeout( () => this.$router.push({ path: '/movies'}), 5000);
    }
  },
};
</script>

<style>
</style>