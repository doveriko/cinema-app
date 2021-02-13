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

    <select @change="selectedSession()" v-model="sessionId">
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
    <button>SUBMIT</button>
    <p>{{errorMessage}}</p>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      day: "",
      sessionId: "",
      sessionTime: "",
      filteredSessions: [],
      sameDayChecker: [],
      selectionError: {
        noSession: null,
        differentDay: false
      },
      errorMessage: "",
    };
  },
  updated() {
    if (this.sameDayChecker.length === 0) {
      this.selectionError.differentDay = true;
    }
    else {
      this.selectionError.differentDay = false;
      this.sessionTime = this.sameDayChecker.time;
    } 

    if (this.sessionId === "") this.selectionError.noSession = true;
    else this.selectionError.noSession = false;
  },
  methods: {
    selectedDay() {
      this.filteredSessions = [];
      this.sameDayChecker = [];
      this.errorMessage = "";
      this.filterSessions();
    },
    selectedSession() {
      this.sameDayChecker = this.filteredSessions.find(session => session.id === this.sessionId);
      this.errorMessage = "";
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
        sessionId : this.sessionId,
        sessionTime: this.sessionTime,
        movieTitle: this.title,
      }
      this.$emit('save-session', sessionId)

      let redirectUrl = ""
      if (!this.selectionError.noSession && !this.selectionError.differentDay && this.selectionError.noSession != null) {
            if (!this.$store.getters.isAuthenticated) redirectUrl = "/auth?redirect=checkout";
            else redirectUrl = "/checkout";
          this.$router.replace(redirectUrl);
      } else {
        this.errorMessage = "Please, select a valid session"
      }
    }
  },
};
</script>