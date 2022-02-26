<template>
  <div id="checkout">
    <h1 class="section-header">CHECKOUT</h1>

    <div class="checkout-panel">
      <div class="booking-image">
        <img class="movie-img" :src="currentOrder.imageUrl" />
      </div>
      <div class="booking-details">
        <h3>Booking details:</h3>
        <div class="booking-data" v-if="currentOrder.orderStatus != 'inactive'">
          <div class="movie-title"><font-awesome-icon icon="film"/> {{ currentOrder.movieTitle }}</div>
          <div class="room"><font-awesome-icon icon="building"/> {{ room }} </div>
          <div class="session"><font-awesome-icon icon="calendar-alt"/> {{sessionTime()}}</div>

          <div class="tickets"><font-awesome-icon icon="ticket-alt"/>{{ numOfTickets() }}:</div>
          <table>
            <tr>
              <th>Area</th>
              <th>Seat number</th>
              <th>Unit Price</th>
            </tr>
            <tr v-for="seat in currentOrder.seats" :key="seat.id">
              <td>{{seat.area}}</td>
              <td>{{seat.number}}</td>
              <td>{{ticketUnitPrice}} €</td>
            </tr>
          </table>
          <div class="subtotal" v-show="currentOrder.offsiteProducts.length">
            <span>Tickets subtotal:</span><span>{{ticketsSubtotal()}} €</span>
          </div>

          <div v-if="currentOrder.offsiteProducts.length">
            <div class="offsite-products"><font-awesome-icon icon="cocktail"/>{{ numOfOffsiteProducts() }}:</div>
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
              </tr>
              <tr v-for="offsiteProduct in currentOrder.offsiteProducts" :key="offsiteProduct.id">
                <td>{{offsiteProduct.name}}</td>
                <td>{{offsiteProduct.quantity}}</td>
                <td>{{offsiteProduct.unitPrice}} €</td>
              </tr>
            </table>
            <div class="subtotal">
              <span>Extra products subtotal:</span><span>{{offsiteProductsSubtotal()}} €</span>
            </div>
          </div>

          <div class="total-price">
            <h3><span>TOTAL:</span> <span>{{totalPrice}} €</span></h3>
          </div>

        </div>

        <div v-if="currentOrder.orderStatus == 'pending' && !isAuthenticated" class="auth-message">
          <p>You have to <a class="auth-link" @click="openAuthModal = true">log in or sign up</a> to complete the order</p>
        </div>

        <div v-if="currentOrder.orderStatus == 'pending' && isAuthenticated" class="complete-order">
          <p>Complete order?</p>
          <span @click="cancelAndRedirect"><font-awesome-icon icon="times"/></span>
          <span @click="completeOrder"><font-awesome-icon icon="check"/></span>
        </div>

        <div v-if="currentOrder.orderStatus == 'completed'">
          <h3 class="booking-completed">Booking completed!</h3>
          <div v-if="currentOrder.bookingCode">
            <span>This is your booking code: </span><span class="booking-code">{{currentOrder.bookingCode}}</span>
          </div>
          <p class="email-sent">You will receive an e-mail shortly with all the details</p>
          <base-button link :to="'my-account'">Go to My Account</base-button>
        </div>

        <div v-if="currentOrder.orderStatus == 'inactive'" >
          <p class="booking-cancelled">Your booking has been cancelled. You will be redirected to the home page</p>
        </div>
      </div>
    </div>

    <div v-if="!isAuthenticated && openAuthModal" class="auth-modal">
      <div class="modal-mask"></div>      
      <div class="modal-container">
        <span class="close-symbol" @click="openAuthModal = false">&#10006;</span>
        <user-auth></user-auth>
      </div>  
    </div>   
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import userAuth from './auth/userAuth.vue';
// import emailjs from 'emailjs-com';
// const $ = require('jquery')
// window.$ = $

export default {
  components: { userAuth },
  data() {
    return {
      room: "",
      ticketUnitPrice: null,
      ticketsSubtotalPrice: null,
      offsiteProductsSubtotalPrice: null,
      openAuthModal: false,
      bookingCode: null,
      totalTickets: null,
      totalOffsiteProducts: null
    };
  },
  computed: {
    ...mapGetters(['currentOrder', 'oneRoom', 'isAuthenticated', 'userName']),
    totalPrice() {
      return this.ticketsSubtotalPrice + this.offsiteProductsSubtotalPrice
    }
  },
  methods: {
    ...mapActions(['cancelOrder']),
    sessionTime() {
      let day = this.currentOrder.sessionTime.slice(8, 10);
      let month = this.currentOrder.sessionTime.slice(5, 7);
      let year = this.currentOrder.sessionTime.slice(0, 4);
      let hour = this.currentOrder.sessionTime.slice(11, 16);

      return `${day}/${month}/${year} at ${hour}`
    },
    numOfTickets() {
      let tickets = this.currentOrder.seats;
      this.totalTickets = tickets.length > 1 ? `${tickets.length} tickets` : "1 ticket"
      return this.totalTickets
    },
    numOfOffsiteProducts() {
      let offsiteProducts = this.currentOrder.offsiteProducts;
      this.totalOffsiteProducts = offsiteProducts.length > 1 ? `${offsiteProducts.length} extra products` : "1 extra product"
      return this.totalOffsiteProducts
    },
    async completeOrder() {
      this.generateBookingCode()
      this.sendOrder()
      // this.sendEmailConfirmation()
    },
    generateBookingCode() {
      function makeid(length) {        
      var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      this.bookingCode = makeid(6)
    },
    async sendOrder() {
      let sessionId = this.currentOrder.sessionId;
      let seats = []
      this.currentOrder.seats.forEach(seat => seats.push(seat.id))

      let offsiteProducts = {
        ids: [],
        quantities: []
      }
      this.currentOrder.offsiteProducts.forEach(offsiteProduct => {
        offsiteProducts.ids.push(offsiteProduct.id)
        offsiteProducts.quantities.push(parseInt(offsiteProduct.quantity))
      })
      
      let order = {
        sessionId : sessionId,
        seats: seats,
        offsiteProducts: offsiteProducts,
        bookingCode: this.bookingCode
      };

      await this.registerOrder(order);
      await this.loadOrders();
    },
    // sendEmailConfirmation() {
    //   if (this.currentOrder.orderStatus == 'completed') {

    //     let emailInfo = {
    //       bookingCode: this.bookingCode,
    //       name: this.userName,
    //       movieTitle: this.currentOrder.movieTitle,
    //       room: this.room,
    //       day: this.sessionDay,
    //       hour: this.sessionHour,
    //       totalTickets: this.totalTickets,
    //       totalOffsiteProducts: this.totalOffsiteProducts
    //     }

    //     let emailConfig = {
    //       service_id: process.env.VUE_APP_EMAILJS_SERVICE,
    //       template_id: process.env.VUE_APP_EMAILJS_TEMPLATE,
    //       user_id: process.env.VUE_APP_EMAILJS_USER,
    //       template_params: emailInfo
    //     };
 
    //     $.ajax(process.env.VUE_APP_EMAILJS_API_URL, {
    //         type: 'POST',
    //         data: JSON.stringify(emailConfig),
    //         contentType: 'application/json'
    //     }).done(function() {
    //         console.log("Email sent!")
    //     }).fail(function(error) {
    //         console.log(error)
    //     });
    //   }
    // },
    async cancelAndRedirect() {
      await this.cancelOrder();
      this.$router.push({ path: '/movies'});
    },
    roomName() {
      let roomId = this.currentOrder.seats[0].roomId;
      let roomInfo = this.oneRoom(roomId);
      this.room = roomInfo.name
      this.ticketUnitPrice = roomInfo.ticketUnitPrice
    },
    ticketsSubtotal() {
      let price = this.currentOrder.seats.length * this.ticketUnitPrice
      this.ticketsSubtotalPrice = price
      return price
    },
    offsiteProductsSubtotal() {
      let totalSum = []
      this.currentOrder.offsiteProducts.forEach( product => {
        let partialSum = product.quantity * product.unitPrice
        totalSum.push(partialSum)
      })
      let price = totalSum.reduce( (a, b) => a + b )
      this.offsiteProductsSubtotalPrice = price
      return price
    }
  },
  created() {
    this.sessionTime();
    this.roomName();
  },
};
</script>

<style lang="scss">
#checkout {
    align-items: center;
    display: flex;
    flex-direction: column;
}
.checkout-panel {
    display: flex;
    width: 80%;
}

#checkout .booking-image {
    flex-basis: 30%;
}

.auth-modal {
  display: flex;
  justify-content: center;
  
  .modal-mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }
  .modal-container {
    z-index: 9999;
    position: fixed;
    top: 10%;

    .close-symbol {
      color: $base-color;
      cursor: pointer;
      display: block;
      text-align: right;
      font-size: 25px;
      margin-bottom: 10px;
      font-weight: bold;

      &:hover {
        color: $base-secondary-color;
    }

    .card {
      margin: 0;
    }
  }

}
}

#checkout .booking-details {
    flex-basis: 70%;
    margin-left: 2em;
    text-align: center;
    font-family: $base-font-family;
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

table {
  width: 100%;
  text-align: center;
}

table th {
  background-color: $base-secondary-color;
  font-weight: normal;
  width: 33%
}

table tr {
  background: #ffcfa9;
  height: 28px;
}

table tr:nth-of-type(odd) {
    background: #ffb478;
}

table tr td {
  font-size: smaller
}

.booking-data .tickets, .booking-data .offsite-products {
    margin: 12px 0 5px;
}

#checkout .booking-details .subtotal {
    text-align: center;
    font-weight: 600;
    margin: 3px;
}

#checkout .booking-details .total-price {
    text-align: center;
    border: 1px solid $base-secondary-color;
    margin-top: 15px;
    border-radius: 5px;
}

#checkout .booking-details .total-price h3 {
    margin: 10px;
}

#checkout #auth .card {
    width: auto;
    margin: 0;
}

.booking-details .auth-link {  
  text-decoration: underline;
  cursor: pointer;
}

.booking-details .auth-link:hover {
    color: $base-secondary-color
}

.auth-message {
    margin-top: 10px;
}

.booking-code {
  font-weight: bold;
}
</style>