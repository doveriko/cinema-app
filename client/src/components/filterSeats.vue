<template>
  <div class="filter-seats">
    <span class="select-seats">2. Select your seats</span>
    <div class="seats-selectors-wrapper">
      <select
        @change="selectedArea()"
        v-model="seatArea"
        class="seat-area-selector"
      >
        <option value="" disabled selected>Select an area</option>
        <option value="Front">Front</option>
        <option value="Middle">Middle</option>
        <option value="Back">Back</option>
      </select>

      <div v-if="this.areaSelected.length" class="seat-number-selector" >
        <span class="select-number">Select seats numbers</span>
        <div v-for="seat in areaSelected" :key="seat.id" class="seat-number">
          <input
            type="checkbox"
            :id="seat.id"
            :name="seat.number"
            :value="seat.id"
            v-model="selectedSeat"
          />
          <label :for="seat.id">{{ seat.number }}</label
          ><br />
        </div>
      </div>

      <!-- <select @change="selectedNumber()" v-model="selectedSeat">
        <option value="" disabled selected>Select seat number</option>
        <option v-if="!areaSelected.length" value="" disabled>No seats available</option>
        <option
          v-for="seat in areaSelected"
          :key="seat.id"
          :id="seat.id"
          :value="seat"
        >
          {{ seat.number }}
        </option>
      </select> -->
      <!-- <p class="auth-errors">{{errorMessage}}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seats: {
      type: Array,
    },
  },
  data() {
    return {
      day: "",
      seatArea: "",
      selectedSeat: [],
      areaSelected: [],
    };
  },
  updated() {
    console.log("selectedSeat", this.selectedSeat)
  },
  methods: {
    selectedArea() {
      this.areaSelected = this.seats.filter(
        (seat) => seat.area == this.seatArea
      );
    },
    selectedNumber() {
      this.$emit("save-seats", this.selectedSeat);
    },
  },
};
</script>

<style scoped>
.seat-number label {
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 10px;
  margin-left: 5px;
  display: inline-block;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.seat-number-selector span {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.select-number {
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 0;
  padding: 8px;
  display: block;
  font-size: 13px;
}
.seat-number {
    padding-left: 42%;
}
@media (min-width: 769px) and (max-width: 1300px) {
    .seats-selectors-wrapper {
        flex-direction: column;
    }
}
</style>