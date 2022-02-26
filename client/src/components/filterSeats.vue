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
        <div v-for="seat in areaSelected" :key="seat.id" class="seat-number">
          <input
            type="checkbox"
            :id="seat.id"
            :name="seat.number"
            :value="seat"
            @change="selectNumber()"
            v-model="selectedSeats"
          />
          <label :for="seat.id">Seat {{ seat.number }}</label
          ><br />
        </div>
      </div>
      
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
      selectedSeats: [],
      areaSelected: [],
    };
  },
  watch: {
    selectedSeats: function() {
      this.$emit('day-changed', this.selectedSeats)
    }
  },
  methods: {
    selectedArea() {
      this.areaSelected = this.seats.filter(
        (seat) => seat.area == this.seatArea
      );
    },
    selectNumber() {
      this.$emit("save-seats", this.selectedSeats);
      this.$nextTick(() => {
        var shoppingcart = document.getElementById("shopping-cart");
        shoppingcart.scrollIntoView({behavior : 'smooth'});
      });
    },
  },
};
</script>

<style scoped lang="scss">
.select-number {
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 0;
  padding: 8px;
  display: block;
  font-size: 13px;

    label {
    font-weight: normal;
    font-size: 14px;
    margin-bottom: 0;
    margin-top: 10px;
    margin-left: 5px;
    display: inline-block;
    font-family: $base-font-family;
  }
}

.seat-number-selector span {
  font-family: $base-font-family;
}
@media (min-width: 769px) and (max-width: 1300px) {
    .seats-selectors-wrapper {
        flex-direction: column;
    }
}

.seat-number {
  display: flex;
  
  label {
    margin-top: 0;
    margin-left: 5px;
    font-family: $base-font-family;
    font-weight: 400;
    font-size: 14px;
  }
}
</style>