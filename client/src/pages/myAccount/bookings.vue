<template>
  <div>
    <div>BOOKINGS</div>
    <div class="bookings">
      <div class="booking-details" v-for="order in orderDataObj" :key="order.index">
        <p>{{order.date}} {{order.hour}} {{order.title}} {{order.index}}</p>
        <button @click="deleteOrder(order)">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      sessionTime: [],
      movieTitle: [],
      orderId: [],
      dates: [],
      hours: [],
      orderDataObj: []
    };
  },
  created() {
    this.loadOrders();
  },
  beforeMount() {
    this.formatData();
    this.loadOrders();
  },
  mounted() {
    // console.log("Movie titles", this.movieTitle);
    // console.log("Session Time", this.sessionTime);
    // console.log("orderId", this.orderId);
    // console.log("Dates", this.dates);
    // console.log("Hours", this.hours);
    console.log("Orders formatted", this.orderDataObj)
    console.log("refresco", this.refresh)
  },
  updated() {
    return this.refresh;
  },
  methods: {
    loadOrders() {
      this.$store.dispatch("loadOrders");
      let allOrders = this.$store.getters.allOrders;
      // let allOrders = this.$store.state.orders.allOrders;
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
          'date': date,
          'hour': this.hours[i],
          'title': this.movieTitle[i],
          'orderId': this.orderId[i]
        }
      })
    },
    deleteOrder(order) {
      console.log("como estan ustedeees?");

        axios
        .delete("http://localhost:3000" + `/users/orders/${order.orderId}`,
          { withCredentials: false }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

        console.log("order removed from backend");

      const idx = this.orderDataObj.indexOf(order)
      this.orderDataObj.splice(idx, 1);

      console.log("order removed from frontend");
    }
  },
  // computed: {
  //   orders() {
  //     return this.dates.map((date, i) => {
  //       return {
  //         date: date,
  //         hour: this.hours[i],
  //         title: this.movieTitle[i],
  //         orderId: this.orderId[i]
  //       }
  //     })
  //   }
  // },
};
</script>

<style>
.bookings {
  display: flex;
  flex-direction: column;
}
.booking-details {
    border: 1px solid;
    border-radius: 10px;
    margin: 10px 0;
}
</style>