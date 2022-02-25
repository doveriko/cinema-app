<template>
  <div class="filter-session">
    <span class="select-tickets">1. Select your tickets for this week:</span>
    <div class="session-selectors-wrapper" @click="activeSelector()">
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
        <option v-if="!filteredSessions.length" value="" disabled>Select a day</option>
        <option
          v-for="session in filteredSessions"
          :key="session.id"
          :id="session.id"
          :value="session.id"
        >
          {{ session.timeFormatted }}
        </option>
      </select>

      <p class="auth-errors">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
    }
  },
  data() {
    return {
      day: "",
      sessionId: "",
      sessionTime: null,
      filteredSessions: [],
      sameDayChecker: [],
      selectionError: {
        noSession: null,
        differentDay: false
      },
      errorMessage: "",
    };
  },
  watch: {
    sessions: function() {
      this.filteredSessions = []
      this.day = ""
    },
    day: function() {
      this.$emit('day-changed', false)
    }
  },
  updated() {
    if (!this.sameDayChecker.length) {
      this.selectionError.differentDay = true;
    }
    else {
      this.selectionError.differentDay = false;
      this.sessionTime = this.sameDayChecker.time;
    } 

    if (this.sessionId == "") this.selectionError.noSession = true;
    else this.selectionError.noSession = false;
  },
  methods: {
    selectedDay() {
      this.filteredSessions = [];
      this.sameDayChecker = [];
      this.errorMessage = "";
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
    selectedSession() {
      this.sameDayChecker = this.filteredSessions.find(session => session.id === this.sessionId);
      this.errorMessage = "";
      this.sessionTime = this.sameDayChecker.time;
      this.saveSession()
    },
    saveSession() {
      const sessionInfo = {
        sessionId : this.sessionId,
        sessionTime: this.sessionTime,
        day: this.day
      }
      this.$emit('save-session', sessionInfo)
    },
    activeSelector() {
      this.$emit('active-selector')
    }
  },
};
</script>

<style lang="scss">
.filter-session form {
  margin: 0;
    padding-left: 0;
  }
.select-tickets, .select-seats {
    color: $base-color;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    font-size: 13pt;
}
.fa-sign-out-alt {
    margin-top: 5px;
    margin-left: 1rem;
}
</style>