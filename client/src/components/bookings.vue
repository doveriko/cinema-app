<template>
  <div id="bookings">
    <h3>BOOKINGS</h3>
      <div class="no-orders" v-if="orderDataObj.length == 0">
        No orders available
      </div>
      <div
        class="booking-details"
        v-for="order in orderDataObj"
        :key="order.key"
      >
        <p>
          {{ order.date }} {{ order.hour }} {{ order.title }}
        </p>
        <button @click="deleteOrder(order)">DELETE</button>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sessionTime: [],
      movieTitle: [],
      orderId: [],
      dates: [],
      hours: [],
      orderDataObj: [],
    };
  },
  created() {
    this.loadOrders();
  },
  beforeMount() {
    this.formatData();
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      this.$store.dispatch("loadOrders");
      let allOrders = this.$store.getters.allOrders;
      var self = this;
      allOrders.map((order) => {
        self.sessionTime.push(order.session.time);
        self.movieTitle.push(order.session.movie.title);
        self.orderId.push(order.id);
      });
    },
    formatData() {
      var self = this;
      this.sessionTime.map((timeStr) => {
        let day = timeStr.slice(8, 10);
        let month = timeStr.slice(5, 7);
        let year = timeStr.slice(0, 4);
        let dateFormatted = day + "/" + month + "/" + year;
        self.dates.push(dateFormatted);
        self.hours.push(timeStr.slice(11, 16));
      });
      this.orders();
    },
    orders() {
      this.orderDataObj = this.dates.map((date, i) => {
        return {
          date: date,
          hour: this.hours[i],
          title: this.movieTitle[i],
          orderId: this.orderId[i],
        };
      });
    },
    deleteOrder(order) {
      axios
        .delete("http://localhost:3000" + `/users/orders/${order.orderId}`, {
          withCredentials: false,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      console.log("order removed from database");

      const idx = this.orderDataObj.indexOf(order);
      this.orderDataObj.splice(idx, 1);
      console.log("order removed from DOM");

      let deletedOrderId = order.orderId;
      let allOrders = this.$store.getters.allOrders;
      let updatedOrders = allOrders.filter(
        (order) => order.id != deletedOrderId
      );
      this.$store.dispatch("updateOrders", updatedOrders);
      console.log("order removed from store");
    },
  },
};
</script>

<style>
#bookings {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
.booking-details {
  border: 1px solid;
  border-radius: 10px;
  margin: 10px 0;
}
</style>