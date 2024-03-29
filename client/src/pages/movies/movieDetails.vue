<template>
  <div class="movie-details-wrapper">
    <h1 class="section-header">{{selectedMovie.title}}</h1>
      <div class="movie-details">
        <div class="movie-cover">
          <img class="movie-img" :src="selectedMovie.imageUrl" />
        </div>
        <div class="movie-sessions">
          <p class="movie-description">{{selectedMovie.description}}</p>
          <div class="rooms-list">
            <label class="available-label">Available in:</label>
            <div class="available-rooms">
              <div v-for="(room, i) in allRoomsAvailable" :key="i" class="room" :class="{'selected' : roomSelected == room.id }" @click="filterRoomSessions(room.id)">
                <label class="room-label">{{room.name}}</label>
              </div>
            </div>
          </div>
          <div class="filters-wrapper">
            <filter-session v-if="roomSelected" :sessions="roomSessions" @save-session="saveSession" @day-changed="unselectSession" @active-selector="showAlert"></filter-session>
            <filter-seats v-if="sessionSelected" :seats="roomSeats" @save-seats="saveSeats"></filter-seats>
          </div>

          <shopping-cart v-if="selectedSeats.length" :tickets="selectedSeats" @delete-ticket="deleteTicket" :movie="selectedMovie.title" :day="day" :time="sessionTime" :room="roomSelected"></shopping-cart>
          
          <offsite-products v-if="continueShopping && selectedSeats.length" @save-offsite-products="saveOffsiteProducts" @offsite-validator="offsiteValidator" @products-loaded="loadOffsiteProducts()"></offsite-products>

          <div class="atc-btn-wrapper" v-if="selectedSeats.length && !continueShopping">
            <button class="atc-btn accept-button" @click.prevent="continueToCheckout()">CONTINUE SHOPPING</button>
          </div>

          <div class="atc-btn-wrapper" id="atc-buttons" v-if="selectedSeats.length && continueShopping">
            <button
              class="atc-btn continue-button"
              @click.prevent="continueWithoutOffer()">
              CONTINUE WITHOUT OFFER
            </button>

            <button
              class="atc-btn accept-button"
              :class="{'disabled' : !offsiteIsValid || !offsiteProducts.length}"
              @click.prevent="continueWithOffer()">
              CONTINUE WITH OFFER
            </button>
          </div>

        </div>
      </div>

      <!-- <user-auth v-if="orderSent"></user-auth> -->
  </div>
</template>

<script>
import filterSession from '../../components/filterSession.vue';
import filterSeats from '../../components/filterSeats.vue';
import shoppingCart from '../../components/shoppingCart.vue';
import offsiteProducts from '../../components/offsiteProducts.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['selectedMovieId'],
  data() {
    return {
      id: this.$route.params.id || this.selectedMovieId,
      selectedMovie: {},
      allRoomsAvailable: [],
      roomSelected: null,
      roomSessions: [],
      day: null,
      sessionId: null,
      sessionTime: null,
      roomSeats: [],
      sessionSelected: false,
      selectedSeats: [],
      continueShopping: false,
      offsiteProducts: [],
      offsiteIsValid: false
    };
  },
  components: { filterSession, filterSeats, shoppingCart, offsiteProducts },
  computed: {
    ...mapGetters(['oneRoom', 'oneMovie']),
  },
  created() {
    this.selectedMovie = this.oneMovie(this.id)
    this.continueShopping = false
    this.findRooms();
  },
  methods: {
    ...mapActions(['saveOrder']),
    findRooms() {
      // 1. Filter ids of all rooms attached to the selected movie sessions
      let filterRooms = this.selectedMovie.sessions.map(session => session.roomId)
      // 2. Filter all unique rooms ids in one array
      let roomsIds = [...new Set(filterRooms)];
      // 3. Extract existing rooms info
      let self = this;
      roomsIds.forEach( function(room) {
        self.allRoomsAvailable.push(self.oneRoom(room))
      })
    },
    filterRoomSessions(roomId) {
      this.sessionSelected = false
      this.roomSessions = []
      this.roomSessions = this.selectedMovie.sessions.filter((session) => session.roomId == roomId)
      this.roomSelected = roomId;
    },
    saveSession(data) {
      this.sessionId = data.sessionId,
      this.sessionTime = data.sessionTime,
      this.day = data.day
      this.getRoomSeats()
    },
    getRoomSeats() {
      this.sessionSelected = true
      let selectedRoom = this.oneRoom(this.roomSelected)
      this.roomSeats = selectedRoom.seats
    },
    unselectSession(data) {
      this.sessionSelected = data //false
      if (this.selectedSeats.length) {
        this.showAlert()
      }
    },
    saveSeats(data) {
      this.selectedSeats = data
    },
    continueWithOffer() {
      if (this.offsiteIsValid && this.offsiteProducts.length) {
        let orderInfo = {
          movieTitle: this.selectedMovie.title,
          imageUrl: this.selectedMovie.imageUrl,
          sessionId : this.sessionId,
          sessionTime: this.sessionTime,
          seats: this.selectedSeats,
          offsiteProducts: this.offsiteProducts
        }
        this.saveOrder(orderInfo);
        this.$router.push({ path: '/checkout'})
        }
    },
    continueWithoutOffer() {
      let orderInfo = {
        movieTitle: this.selectedMovie.title,
        imageUrl: this.selectedMovie.imageUrl,
        sessionId : this.sessionId,
        sessionTime: this.sessionTime,
        seats: this.selectedSeats,
        offsiteProducts: []
      }
      this.saveOrder(orderInfo);
      this.$router.push({ path: '/checkout'})
    },
    deleteTicket(ticket) {
      this.selectedSeats.splice(ticket, 1)
    },
    showAlert() {
      if (this.selectedSeats.length) {
        this.$swal({
          title: 'Cancel selection?',
          text: "If you change the session, the current tickets will be removed",
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '$base-color',
          denyButtonColor: '$base-secondary-color',
          confirmButtonText: 'No',
          denyButtonText: 'Yes'
        })
        .then((result) => {
          if (result.isDenied) {
            this.selectedSeats = []
            this.sessionSelected = false
            this.continueShopping = false
          }
        })
      }
    },
    continueToCheckout() {
      this.continueShopping = true;
      this.$nextTick(() => {
        var offsiteProducts = document.getElementById("offsite-products");
        offsiteProducts.scrollIntoView({behavior : 'smooth', block: 'end'});
      });
    },
    saveOffsiteProducts(data) {
      this.offsiteProducts = data
    },
    offsiteValidator(data) {
      this.offsiteIsValid = data
    }
  }
};
</script>

<style lang="scss">
.mobile {

  .movie-cover {
      padding-right: 0;
  }

  .movie-details {
      flex-direction: column;
      padding: 0 1em;
  }
  
  #filters {
    select {
      width: 100%;
    }
    form {
      padding: 10px 0;
    }
  }
}

.movie-details {
  display: flex;
  justify-content: center;

  .room {
    border: 1px solid;
    width: fit-content;
    background: $base-color;
    border-radius: 30px;
    margin-right: 15px;
    font-family: $base-font-family;
  }

  .room-label {
      text-align: center;
      padding: 0px 5px;
      color: white;
      margin: 10px;
  }

  .available-rooms {
      display: flex;
      margin-top: 15px;
  }

  .room, .room-label {
      cursor: pointer;
  }
}

.movie-cover {
    flex-basis: 20%;
    padding-right: 2em;
}

.movie-sessions {
    flex-basis: 50%;
}

.movie-description, .available-label {
    font-family: $base-font-family;
    text-align: justify;
}

.room.selected {
    background: $base-secondary-color;
}

.filters-wrapper, .session-selectors-wrapper, .seats-selectors-wrapper {
    display: flex;
}

.seat-number-selector, .seat-area-selector {
    flex-basis: 50%;
    margin-top: 5px;
}
.filter-session, .filter-seats {
  margin-top: 1.5rem;

  select {
    height: 32px;
    border: 1px solid $base-color;
    border-radius: 3px;
    margin: 10px;
    margin-left: 0;
    padding: 5px;
    min-width: 150px;
    font-family: $base-font-family;
  }
}

.filter-session {
    margin-right: 1em;
}

.atc-btn-wrapper {
  display: flex;

  .atc-btn {
    &.accept-button {
      margin-left: 20px;
      font-weight: bold;

      &.disabled {
        background: lightgrey;
        cursor: not-allowed;
        border: grey
      }
    }

    &.continue-button {
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      font: inherit;
      font-weight: bold;
      background-color: white;
      border: 1px solid $base-color;
      color: $base-color;
      cursor: pointer;
      border-radius: 30px;
      display: inline-block;
      font-family: $base-font-family;
      margin-left: auto;
    }
  }
}

@media (max-width: 768px) {
  .filters-wrapper, .session-selectors-wrapper, .seats-selectors-wrapper {
    justify-content: center;
  }
}

@media (max-width: 650px) {
  .filters-wrapper, .session-selectors-wrapper, .seats-selectors-wrapper {
      flex-direction: column;
  }
  .filter-session, .filter-session select, .filter-seats select {
    margin-right: 0
  }
}
</style>