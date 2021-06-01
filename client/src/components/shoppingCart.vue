<template>
 <div id="shopping-cart">
   <span class="summary-label"><span>Your tickets for {{movie}} on {{dayTimeRoomFormatted()}}</span></span>
   <button @click="showAlert">Hello world</button>
   <div class="summary-table">
      <div v-for="(ticket, i) in tickets" :key="i" class="ticket-list">
        <div>
          <font-awesome-icon icon="ticket-alt" class="ticket-icon"/> {{i+1}}.
          <span class="ticket-item">{{ticket.area}} area. Seat number: {{ticket.number}}</span> 
        </div>
        <font-awesome-icon icon="trash-alt" class="delete-ticket" @click="deleteTicket(i)" />
      </div>
    </div>
    <div class="total-price-container">
      <div><span class="total-price-label">Total price:</span> {{tickets.length}} {{this.ticketOrTickets}} × {{this.unitPrice}} € = {{totalPrice}} €</div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['tickets', 'movie', 'day', 'time', 'room'],
  data() {
    return {
      unitPrice: 5,
    };
  },
  computed: {
    totalPrice() {
      return this.tickets.length * this.unitPrice
    },
    ticketOrTickets() {
      if (this.tickets.length == 1) return "ticket"
      else return "tickets"
    }
  },
  methods: {
    deleteTicket(ticket) {
      this.$emit("delete-ticket", ticket);
    },
    dayTimeRoomFormatted() {
      return `${this.day} at ${this.time} at cine ${this.room}`
    },
    showAlert() {
      this.$swal({
          title: 'Cancel selection?',
          text: "If you change the session, the current tickets will be removed",
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3a0061',
          denyButtonColor: '#f16b00',
          confirmButtonText: 'Keep it',
          denyButtonText: 'Cancel'
        }).then((result) => {
          if (result.isDenied) {
            this.hola()
          }
        })
    },
    hola() {
      this.$emit("delete-all-tickets");
    }
  }
}
</script>

<style>
#shopping-cart {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background: #ffeddf;
  padding: 1rem 2rem;
  margin: 1rem;
}
.ticket-list {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
#shopping-cart .ticket-icon {
    color: #f16b00;
}
.summary-label {
    text-align: center;
    display: block;
    font-weight: bold;
    font-size: 16px;
}
.total-price-container {
    padding: 1rem;
    border: 1px solid orange;
    margin-top: 1rem;
    text-align: center;
}
.total-price-label {
    font-weight: bold;
}
.summary-table {
    margin: 1.5rem 0;
}
.delete-ticket {
  margin-left: 1rem
}
</style>