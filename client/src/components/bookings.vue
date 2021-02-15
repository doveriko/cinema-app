<template>
  <div id="bookings">
    <h1 class="section-header">BOOKINGS</h1>
      <div class="no-orders" v-if="orderDataObj.length == 0">
        <div>No orders available</div>
        <base-button link :to="'movies'">Go to Movies</base-button>
      </div>
      <div
        class="booking-details"
        v-for="order in orderDataObj"
        :key="order.key"
      >
        <div class="order-title">{{ order.title }}</div>
        <div class="order-date">Day: {{ order.date }}</div>
        <div class="order-hour">Hour: {{ order.hour }}</div>

        <span v-if="!deletionIsActive" @click.prevent="activateDeletion(order.orderId)"><font-awesome-icon icon="trash-alt"/></span>

        <div class="delete-order" v-if="deletionIsActive && order.orderId == selectedOrder">
          <div>Are you sure you want to delete this order?</div>
          <span @click.prevent="deletionIsActive = false"><font-awesome-icon icon="times"/></span>
          <span @click.prevent="deleteOrder(order)"><font-awesome-icon icon="check"/></span>
        </div>
        
      </div>
  </div>
</template>

<script>
// import axios from "axios";

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
      this.orders();
    },
    async orders() {
      this.orderDataObj = this.dates.map((date, i) => {
        return {
          date: date,
          hour: this.hours[i],
          title: this.movieTitle[i],
          orderId: this.orderId[i],
        };
      });
    },
    async deleteOrder(order) {
      this.$store.dispatch("deleteOrder", order.orderId)
      console.log("order removed from database and store");

      const idx = this.orderDataObj.indexOf(order);
      this.orderDataObj.splice(idx, 1);
      console.log("order removed from DOM");

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
  border-radius: 10px;
  background: #fff3b6;
  margin: 10px 0;
}
.mobile .booking-details {
    padding: 1em 0;
}
h1.section-header {
    justify-content: center;
    display: flex;
    font-size: 20pt;
    margin: 10px 0;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: #f16b00;
}
.order-title {
    font-weight: bold;
}
.booking-details {padding: 10px 0;}
.booking-details div {
    padding: 3px;
}
.fa-trash-alt  {
    cursor: pointer;
}
.fa-trash-alt path {
    fill: #ff8686;
}
.order-hour {
    margin-bottom: 5px;
}
.delete-order {
  margin-top: 5px;
}
.fa-times path {
    fill: #ff3b3b;
}
.fa-check path {
    fill: #30b7308f;
}
.delete-order svg {
    margin: 10px 20px 0;
    cursor: pointer;
}
</style>