<template>
  <div>
    <form @submit.prevent="saveSession">
    <select @change="selectedDay()" v-model="day">
      <option value="" disabled selected>Select day</option>
      <option value="1">Monday</option>
      <option value="2">Tuesday</option>
      <option value="3">Wednesday</option>
      <option value="4">Thursday</option>
      <option value="5">Friday</option>
      <option value="6">Saturday</option>
      <option value="0">Sunday</option>
    </select>

    <select v-model="sessionId">
      <option value="" disabled selected>Select session</option>
      <option v-if="filteredSessions.length === 0" value="" disabled>No sessions available</option>
      <option
        v-for="session in filteredSessions"
        :key="session.id"
        :id="session.id"
        :value="session.id"
      >
        {{ session.timeFormatted }}
      </option>
    </select>
    <base-button link :to="submitLink">SUBMIT</base-button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
    },
  },
  data() {
    return {
      day: "",
      sessionId: "",
      filteredSessions: []
    };
  },
  computed: {
    submitLink() {
      if (!this.$store.getters.isAuthenticated) return "/auth?redirect=checkout"
      else return "/checkout"
    }
  },
  updated() {
    console.log("this.filteredSessions", this.filteredSessions);
    console.log("this.sessionId", this.sessionId);
  },
  methods: {
    selectedDay() {
      this.filteredSessions = [];
      this.filterSessions();
    },
    filterSessions() {
      var self = this;
      this.sessions.map(function (session) {
        let dayNum = new Date(session.time).getDay();
        if (dayNum == self.day) {
          self.filteredSessions.push(session);
        }
        self.formatTime();
      });
    },
    formatTime() {
      this.filteredSessions.map(function (session) {
        let sessionTime = session.time.slice(11, 16);
        session.timeFormatted = sessionTime;
      });
    },
    saveSession() {
      const sessionId = {
        sessionId : this.sessionId
      }
      this.$emit('save-session', sessionId)
    }
  },
};
</script>

<style>
</style>