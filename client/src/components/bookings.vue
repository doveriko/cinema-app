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
        <button @click.prevent="activateDeletion(order.orderId)">DELETE</button>
        <div v-if="deletionIsActive && order.orderId == selectedOrder">
          Are you sure?
          <button @click.prevent="deleteOrder(order)">YES</button>
          <button @click.prevent="deletionIsActive = false">NO</button>
        </div>
      </div>
      <h3>{{this.selectedOrderId}}</h3>
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
      deletionIsActive: false,
      selectedOrderId: null
    };
  },
  computed: {
    selectedOrder () {
      return this.selectedOrderId
    }
  },
  created() {
    this.loadOrders();
  },
  // beforeMount() {
  //   this.formatData();
  // },
  methods: {
    async loadOrders() {
      await this.$store.dispatch("loadOrders");
      let allOrders = this.$store.getters.allOrders;
      var self = this;
      allOrders.map((order) => {
        self.sessionTime.push(order.session.time);
        self.movieTitle.push(order.session.movie.title);
        self.orderId.push(order.id);
      });
      console.log("1 load orders", allOrders);
      this.formatData()
    },
    async formatData() {
      var self = this;
      this.sessionTime.map((timeStr) => {
        let day = timeStr.slice(8, 10);
        let month = timeStr.slice(5, 7);
        let year = timeStr.slice(0, 4);
        let dateFormatted = day + "/" + month + "/" + year;
        self.dates.push(dateFormatted);
        self.hours.push(timeStr.slice(11, 16));
      });
      console.log("2 this.dates", this.dates);
      console.log("3 this.hours", this.hours);
      this.orders();
    },
    async orders() {
      console.log("5 this.orderDataObj", this.orderDataObj);
      this.orderDataObj = this.dates.map((date, i) => {
        return {
          date: date,
          hour: this.hours[i],
          title: this.movieTitle[i],
          orderId: this.orderId[i],
        };
      });
      console.log("6 ", this.orderId);
    },
    async deleteOrder(order) {
      console.log("orderId in Axios", order.orderId);
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
      this.selectedOrderId = null;
      this.deletionIsActive = false;
    },
    activateDeletion(orderId) {
      this.selectedOrderId = orderId;
      this.deletionIsActive = true;
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