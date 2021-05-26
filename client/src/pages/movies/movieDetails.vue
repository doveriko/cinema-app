<template>
  <div class="movie-details-wrapper">
    <h1 class="section-header">{{selectedMovie.title}}</h1>
      <div class="movie-details">
        <div class="movie-cover">
          <img class="movie-img" :src="selectedMovie.imageUrl" />
        </div>
        <div class="movie-sessions">
          <p class="movie-description">{{selectedMovie.description}}</p>
          <div>
            <label class="available-label">Available in:</label>
            <div class="available-rooms">
              <div v-for="(room, i) in allRoomsAvailable" :key="i" class="room" :class="{'selected' : roomSelected == room.id }" @click="filterRoomSession(room.id)">
                <label class="room-label">{{room.name}}</label>
              </div>
            </div>
          </div>
          <filter-session v-if="roomSelected" :sessions="roomSessions" @save-session="saveSession"></filter-session>
          <filter-seats v-if="sessionSelected" :seats="roomSeats" @save-seats="saveSeats"></filter-seats>
        </div>
      </div>
  </div>
</template>

<script>
import filterSession from '../../components/filterSession.vue';
import filterSeats from '../../components/filterSeats.vue';
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
      sessionId: null,
      sessionTime: null,
      roomSeats: [],
      sessionSelected: false
    };
  },
  components: { filterSession, filterSeats },
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
      this.roomSessions = []
      this.roomSessions = this.selectedMovie.sessions.filter((session) => session.roomId == roomId)
      this.roomSelected = roomId;
      console.log("this.roomSessions", this.roomSessions)
      console.log("this.roomSelected", this.roomSelected)
    },
    saveSession(data) {
      this.sessionId = data.sessionId,
      this.sessionTime = data.sessionTime
      this.getRoomSeats()
    },
    getRoomSeats() {
      this.sessionSelected = true
      let selectedRoom = this.oneRoom(this.roomSelected)
      this.roomSeats = selectedRoom.seats
    },
    saveSeats() {
    },
    saveOrder() {
      let orderInfo = {
        title: this.selectedMovie.title,
        imageUrl: this.selectedMovie.imageUrl,
        sessionId : this.sessionId,
        sessionTime: this.sessionTime
      }
      this.$store.dispatch('saveOrder', orderInfo);
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
</style>