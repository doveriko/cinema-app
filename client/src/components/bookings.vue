<template>
  <div id="bookings">
    <h1 class="section-header">BOOKINGS</h1>
      <div class="no-orders" v-if="!orderDataObj.length">
        <div v-if="loadingMessage">
          <span>{{loadingMessage}}</span>
        </div>
        <div v-else>
          <span>No orders available</span>
        </div>
        <base-button link :to="'movies'">Go to Movies</base-button>
      </div>
      <div
        class="booking-details"
        v-for="order in orderDataObj"
        :key="order.key"
      >
        <div class="order-title">{{ order.title }}</div>

        <div class="order-content">

          <div class="date">
            <font-awesome-icon icon="calendar-alt"/> <span class="order-date">Day: {{ order.date }}</span>
          </div>

          <div class="hour">
            <font-awesome-icon icon="clock"/> <span class="order-hour">Time: {{ order.hour }}</span>
          </div>

          <div class="room">
            <font-awesome-icon icon="building"/> <span class="order-room">Room: {{ order.room }}</span>
          </div>

          <div class="seats">
            <div>
              <font-awesome-icon icon="ticket-alt"/> <span>{{numOfTickets(order.seats.length)}}</span>
            </div>
            <div v-for="seat in order.seats" :key="seat.key" class="seats-info">
              <span>{{seat.area}} area, </span> 
              <span>number {{seat.number}}</span>
            </div>
          </div>

          <div class="offsite-products">
            <div>
              <font-awesome-icon icon="beer"/> <span>{{numOfProducts(order.offsiteProducts.length)}}</span>
            </div>
            <div v-for="product in order.offsiteProducts" :key="product.key" class="offsite-products-info">
              <span>{{product.reserved_offsite_products.quantity}} x {{product.name}}</span> 
            </div>
          </div>

          <div class="booking-code-wrapper">
            <span>Booking code: </span><span class="booking-code">{{order.bookingCode}}</span>
          </div>

        </div>

        <div class="delete-btn" v-if="!deletionIsActive" @click.prevent="activateDeletion(order.orderId)"><font-awesome-icon icon="trash-alt"/></div>

        <div class="delete-order" v-if="deletionIsActive && order.orderId == selectedOrder">
          <div>Are you sure you want to delete this order?</div>
          <span @click.prevent="deletionIsActive = false"><font-awesome-icon icon="times"/></span>
          <span @click.prevent="deleteOrder(order)"><font-awesome-icon icon="check"/></span>
        </div>
        
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      orderDataObj: [],
      deletionIsActive: false,
      selectedOrderId: null,
      loadingMessage: null
    };
  },
  computed: {
    ...mapGetters([
      'allOrders'
    ]),
    selectedOrder () {
      return this.selectedOrderId
    }
  },
  methods: {
    ...mapActions([
      'loadOrders',
      'deleteOrder'
    ]),
    async loadFormattedOrders() {
      this.loadingMessage = "Loading orders"
      await this.loadOrders();
      this.loadingMessage = null
      this.formatOrders()
    },
    formatOrders() {
      var self = this;

      this.allOrders.forEach(order => {
        let orderFormatted = {};

        orderFormatted.room = self.roomName(order.seats)
        orderFormatted.date = self.formatTime(order.session.time)
        orderFormatted.hour = order.session.time.slice(11, 16)
        orderFormatted.title = order.session.movie.title
        orderFormatted.seats = order.seats
        orderFormatted.offsiteProducts = order.offsiteProducts
        orderFormatted.id = order.id
        orderFormatted.bookingCode = order.bookingCode

        self.orderDataObj.push(orderFormatted)
      })
    },
    formatTime(time) {
      let day = time.slice(8, 10);
      let month = time.slice(5, 7);
      let year = time.slice(0, 4);
      let dateFormatted = day + "/" + month + "/" + year;
      return dateFormatted;
    },
    roomName(seats) {
      if (seats.length > 0) {
        let myRoom = seats[0].room.name
        return myRoom
      }
    },
    async deleteOrder(order) {
      //Remove order from database and store
      this.deleteOrder(order.id);
      
      //Remove order from DOM
      let idx = this.orderDataObj.indexOf(order);
      this.orderDataObj.splice(idx, 1);

      this.selectedOrderId = null;
      this.deletionIsActive = false;
    },
    activateDeletion(orderId) {
      this.selectedOrderId = orderId;
      this.deletionIsActive = true;
    },
    numOfTickets(tickets) {
      return tickets > 1 ? `${tickets} tickets:` : `1 ticket:`
    },
    numOfProducts(offsiteProducts) {
      return offsiteProducts > 1 ? `${offsiteProducts} deals:` : `1 deal:`
    }
  },
  created() {
    this.loadFormattedOrders();
  },
};
</script>

<style lang="scss">
.mobile {
  .booking-details {
    padding: 1em 0;
  }
}

#bookings {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.section-header {
  justify-content: center;
  display: flex;
  font-size: 20pt;
  margin: 10px 0;
  font-family: $base-font-family;
  color: $base-secondary-color;
}

.order-title {
  font-weight: bold;
  font-size: 18px;
}

.fa-trash-alt  {
  cursor: pointer;
  path {
    fill: #ff8686;
  }
}

.order-hour {
  margin-bottom: 5px;
}

.delete-order {
  margin-top: 5px;

  svg {
    margin: 10px 20px 0;
    cursor: pointer;
  }
}

.fa-times path {
  fill: #ff3b3b;
}

.fa-check path {
  fill: #30b7308f;
}

.booking-details {
  border-radius: 10px;
  background: #fff3b6;
  margin: 10px 0;
  padding: 10px 0;

  div {
    padding: 3px;
  }
  .order-content {
    div {
      width: 200px;
      margin: 0 auto;
      display: flex;
    }
    svg {
      width: 30px;
      margin-right: 1rem;
      path {
          fill: $base-secondary-color
      }
    }
    .seats-info, .offsite-products-info {
      display: list-item;
      list-style-type: disc;
      font-size: smaller;
      margin-left: 48px;
      justify-content: flex-start;
      list-style-position: inside;
      text-align: start !important;
    }
  }

  .delete-btn, .delete-order {
    margin-top: 1rem
  }
}

.seats, .offsite-products {
  display: flex;
  flex-direction: column;
}

.booking-code-wrapper {
  justify-content: center;
}
</style>