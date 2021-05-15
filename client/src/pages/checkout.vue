<template>
  <div id="checkout">
    <h1 class="section-header">CHECKOUT</h1>

    <div class="checkout-panel">
      <div class="booking-image">
        <img class="movie-img" :src="imageUrl" />
      </div>
      <div class="booking-details">
        <h3>Booking details:</h3>
        <div class="booking-data" v-if="this.orderStatus != 'inactive'">
          <div><font-awesome-icon icon="ticket-alt"/> 1 ticket</div>
          <div><font-awesome-icon icon="film"/> {{ movieTitle }}</div>
          <div><font-awesome-icon icon="calendar-alt"/> {{ day }}/{{ month }}/{{ year }} at {{ hour }}</div>
        </div>
        <div v-if="this.orderStatus == 'pending'" class="complete-order">
          <p>Complete order?</p>
          <span @click="cancelOrder"><font-awesome-icon icon="times"/></span>
          <span @click="completeOrder"><font-awesome-icon icon="check"/></span>
        </div>

      <div v-if="this.orderStatus == 'completed'">
      <h3 class="booking-completed">Booking completed!</h3>
      <p>You will receive an e-mail shortly with the reference number to show at the box office</p>

      <base-button link :to="'my-account'">Go to My Account</base-button>
    </div>

    <div v-if="this.orderStatus == 'inactive'" >
      <p class="booking-cancelled">Your booking has been cancelled. You will be redirected to the home page</p>
    </div>
      </div>
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
    imageUrl() {
      return this.$store.state.orders.imageUrl;
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
#checkout {
    align-items: center;
    display: flex;
    flex-direction: column;
}
.checkout-panel {
    display: flex;
    width: 60%;
}

#checkout .booking-image {
    flex-basis: 30%;
}

#checkout .booking-details {
    flex-basis: 70%;
    margin-left: 2em;
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.booking-data {
    text-align: initial;
    width: 80%;
    margin: 0 auto;
}
.booking-data svg {
    margin-right: 5px;
}
.booking-data svg path {
    fill: #dc6200
}
.booking-completed {
  color: #dc6200;

}
.booking-completed + p {
  max-width: 70%;
  margin: 0 auto;
  font-size: 14px;
}
.complete-order {
    color: #dc6200;
}
.complete-order svg {
    margin: 0 1em;
    font-size: 24px;
    cursor: pointer;
}
.complete-order .fa-times path {
    fill: #ff3b3bbf;
}
.complete-order .fa-check path {
    fill: #30b730;
}
.booking-cancelled p {
  display: block;
  margin: 0 auto;
}
.mobile .checkout-panel {
    width: 100%;
}
.mobile .booking-image {
    display: none;
}
.mobile #checkout .booking-details {
    margin: 0;
    flex-basis: 100%;
    padding-bottom: 2em;
    margin-top: 1em;
}
</style>