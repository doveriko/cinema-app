<template>
  <div class="filter-seats">
    <span class="select-seats">2. Select your seats</span>
    <div class="selectors-wrapper">
      <select @change="selectedArea()" v-model="seatArea">
        <option value="" disabled selected>Select an area</option>
        <option value="Front">Front</option>
        <option value="Middle">Middle</option>
        <option value="Back">Back</option>
      </select>

      <select @change="selectedNumber()" v-model="seatNumber">
        <option value="" disabled selected>Select seat number</option>
        <!-- <option v-if="filteredSessions.length === 0" value="" disabled>No sessions available</option>
        <option
          v-for="session in filteredSessions"
          :key="session.id"
          :id="session.id"
          :value="session.id"
        >
          {{ session.timeFormatted }}
        </option> -->
        
      </select>
      <!-- <p class="auth-errors">{{errorMessage}}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seats: {
      type: Array,
    }
  },
  data() {
    return {
      day: "",
      seatArea: null,
      seatNumber: null,
    };
  },
  updated() {
    console.log("this.seats", this.seats)
  },
  methods: {

  },
};
</script>

<style scoped>
</style>