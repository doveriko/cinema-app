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
              <div v-for="(room, i) in allRoomsAvailable" :key="i" class="room" :class="{'selected' : roomSelected == room.id }" @click="filterRoomSession(room.id)">
                <label class="room-label">{{room.name}}</label>
              </div>
            </div>
          </div>
          <div class="filters-wrapper">
            <filter-session v-if="roomSelected" :sessions="roomSessions" @save-session="saveSession" @day-changed="unselectSession"></filter-session>
            <filter-seats v-if="sessionSelected" :seats="roomSeats" @save-seats="saveSeats"></filter-seats>
          </div>
          <shopping-cart v-if="selectedSeats.length" :tickets="selectedSeats" @delete-ticket="deleteTicket" :movie="selectedMovie.title" :day="day" :time="sessionTime" :room="roomSelected"></shopping-cart>
        </div>
      </div>
  </div>
</template>

<script>
import filterSession from '../../components/filterSession.vue';
import filterSeats from '../../components/filterSeats.vue';
import shoppingCart from '../../components/shoppingCart.vue';
import { mapGetters } from 'vuex';

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
      selectedSeats: []
    };
  },
  components: { filterSession, filterSeats, shoppingCart },
  computed: {
    ...mapGetters(['oneRoom']),
  },
  created() {
    this.selectedMovie = this.$store.getters.oneMovie(this.id)
    this.findRooms();
  },
  methods: {
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
    filterRoomSession(roomId) {
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
    },
    saveSeats(data) {
      this.selectedSeats = data
    },
    saveOrder() {
      let orderInfo = {
        title: this.selectedMovie.title,
        imageUrl: this.selectedMovie.imageUrl,
        sessionId : this.sessionId,
        sessionTime: this.sessionTime,
        seats: this.selectedSeats
      }
      this.$store.dispatch('saveOrder', orderInfo);
    },
    deleteTicket(ticket) {
      this.selectedSeats.splice(ticket, 1)
    }
  }
};
</script>

<style>
.movie-details {
    display: flex;
    justify-content: center
}
.movie-cover {
    flex-basis: 20%;
    padding-right: 2em;
}
.mobile .movie-cover {
    padding-right: 0;
}
.movie-sessions {
    flex-basis: 50%;
}
.movie-description, .available-label {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: justify;
}
.mobile .movie-details {
    flex-direction: column;
    padding: 0 1em;
}
.mobile #filters select {
    width: 100%;
}
.mobile #filters form {
    padding: 10px 0;
}
.movie-details .room {
    border: 1px solid;
    width: fit-content;
    background: #3a0061;
    border-radius: 30px;
    margin-right: 15px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.movie-details .room-label {
    text-align: center;
    padding: 0px 5px;
    color: white;
    margin: 10px;
}
.movie-details .available-rooms {
    display: flex;
    margin-top: 15px;
}
.movie-details .room, .room-label {
    cursor: pointer;
}
.room.selected {
    background: #f16b00;
}
.filters-wrapper, .session-selectors-wrapper, .seats-selectors-wrapper {
    display: flex;
}
.filter-seats, .filter-session {
    margin-top: 1.5rem;
}
.seat-number-selector, .seat-area-selector {
    flex-basis: 50%;
    margin-top: 5px;
}
.filter-session select, .filter-seats select {
    height: 32px;
    border: 1px solid #3a0061;
    border-radius: 3px;
    margin: 10px;
    margin-left: 0;
    padding: 5px;
    min-width: 150px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.filter-session {
    margin-right: 1em;
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