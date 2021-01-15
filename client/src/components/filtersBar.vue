<template>
  <div>
    <select name="" id="" @change="selectedDay()" v-model="day">
      <option :value="null" selected disabled>Select day</option>
      <option value="1">Monday</option>
      <option value="2">Tuesday</option>
      <option value="3">Wednesday</option>
      <option value="4">Thursday</option>
      <option value="5">Friday</option>
      <option value="6">Saturday</option>
      <option value="0">Sunday</option>
    </select>

    <select v-if="filteredSessions.length > 0">
      <option value="0" selected disabled>Select session</option>
      <option
        v-for="session in filteredSessions"
        :key="session.id"
        :value="session.time"
      >
        {{ timeFormatted }}
      </option>
    </select>
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
      filteredSessions: [],
    };
  },
  computed: {
    timeFormatted() {
      return this.dayFormatted;
    },
  },
  methods: {
    selectedDay() {
      console.log("Selected day ->", this.day);
      this.filteredSessions = [];
      this.sessionDay();
    },
    sessionDay() {
      var self = this;
      this.sessions.map(function (session) {
        let dayNum = new Date(session.time).getDay();
        console.log("Session days in numbers ->", dayNum);
        if (dayNum == self.day) {
          self.filteredSessions.push(session);
        }
        self.filterSessions();
      });
      console.log("this.filteredSessions", self.filteredSessions);
    },
    filterSessions() {
      var self = this;
      this.filteredSessions.map(function (session) {
        let sessionTime = session.time.slice(11, 16);
        self.dayFormatted = sessionTime;
      });
    },
  },
};
</script>

<style>
</style>