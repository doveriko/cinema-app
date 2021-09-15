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

          <div class="tickets"><font-awesome-icon icon="ticket-alt"/>{{ numOfTickets }}</div>
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
            <div class="offsite-products"><font-awesome-icon icon="cocktail"/>{{ numOfOffsiteProducts }}</div>
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
          <p>You have to <a class="auth-link" @click="authenticate()">log in or sign up</a> to complete the order</p>
        </div>

        <div v-if="currentOrder.orderStatus == 'pending' && isAuthenticated" class="complete-order">
          <p>Complete order?</p>
          <span @click="cancelOrder"><font-awesome-icon icon="times"/></span>
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

    <user-auth v-if="!isAuthenticated && completePurchaseActivated"></user-auth>
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import userAuth from './auth/userAuth.vue';
// import emailjs from 'emailjs-com';
const $ = require('jquery')
window.$ = $

export default {
  components: { userAuth },
  data() {
    return {
      room: "",
      ticketUnitPrice: null,
      ticketsSubtotalPrice: null,
      offsiteProductsSubtotalPrice: null,
      completePurchaseActivated: false,
      bookingCode: null
    };
  },
  computed: {
    ...mapGetters(['currentOrder', 'oneRoom', 'isAuthenticated', 'userName']),
    numOfTickets() {
      let tickets = this.currentOrder.seats;
      return tickets.length > 1 ? `${tickets.length} tickets:` : "1 ticket:"
    },
    numOfOffsiteProducts() {
      let offsiteProducts = this.currentOrder.offsiteProducts;
      return offsiteProducts.length > 1 ? `${offsiteProducts.length} extra products:` : "1 extra product:"
    },
    totalPrice() {
      return this.ticketsSubtotalPrice + this.offsiteProductsSubtotalPrice
    }
  },
  created() {
    this.sessionTime();
    this.roomName();
    this.completePurchaseActivated = false
  },
  methods: {
    sessionTime() {
      let day = this.currentOrder.sessionTime.slice(8, 10);
      let month = this.currentOrder.sessionTime.slice(5, 7);
      let year = this.currentOrder.sessionTime.slice(0, 4);
      let hour = this.currentOrder.sessionTime.slice(11, 16);

      return `${day}/${month}/${year} at ${hour}`
    },
    authenticate() {
      this.completePurchaseActivated = true
      var authInDOM = setInterval(function() {
      var auth = document.getElementById("auth");
      if (auth) {
          auth.scrollIntoView({behavior : 'smooth'});
          clearInterval(authInDOM);
      }
      }, 100);
    },
    async completeOrder() {
      this.generateBookingCode()
      this.sendOrder()
      this.sendEmailConfirmation()
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
      this.bookingCode = makeid(5)
    },
    sendOrder() {
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
      console.log("order", order)

      this.$store.dispatch("registerOrder", order);
      this.$store.dispatch("loadOrders");
    },
    sendEmailConfirmation() {
      if (this.currentOrder.orderStatus == 'completed') {

        let emailInfo = {
          bookingCode: this.bookingCode,
          name: this.userName,
          movieTitle: this.currentOrder.movieTitle,
          room: this.room
        }

        let emailConfig = {
          service_id: process.env.EMAILJS_SERVICE,
          template_id: process.env.EMAILJS_TEMPLATE,
          user_id: process.env.EMAILJS_USER,
          template_params: emailInfo
        };
 
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(emailConfig),
            contentType: 'application/json'
        }).done(function() {
            console.log("Email sent!")
        }).fail(function(error) {
            alert('Oops... ' + JSON.stringify(error));
        });
    
        // try {
        //   emailjs.sendForm('service_tel559n', 'template_fr1zr8m', emailInfo, 'user_rPHVQWG28jEKupx59UenZ')
        //   console.log("Email sent")
        // } catch(error) {
        //   console.log({error})
        // }
      }
    },
    cancelOrder() {
      let resetOrder = {
        userId : null,
        sessionId : null,
        sessionTime : "",
        movieTitle : "",
        orderStatus : "inactive",
        seats: null,
        offsiteProducts: null
      }
      this.$store.dispatch("cancelOrder", resetOrder);
      setTimeout( () => this.$router.push({ path: '/movies'}), 3000);
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
  }
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
    width: 80%;
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

table {
  width: 100%;
  text-align: center;
}

table th {
  background-color: #f16b00;
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
    border: 1px solid #f16b00;
    margin-top: 15px;
    border-radius: 5px;
}

#checkout .booking-details .total-price h3 {
    margin: 10px;
}

#checkout #auth .card {
    width: 100%
}

.booking-details .auth-link {  
  text-decoration: underline;
  cursor: pointer;
}

.booking-details .auth-link:hover {
    color: #f16b00
}

.auth-message {
    margin-top: 10px;
}

.booking-code {
  font-weight: bold;
}
</style>