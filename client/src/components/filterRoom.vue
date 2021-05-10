<template>
  <div class="filter-room">
    <select @change="selectedRoom()" v-model="room">
      <option value="" disabled selected>Filter by room</option>
      <option v-for="(room, i) in allRooms" :key="i" :value="room">{{room.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    allRooms: {
      type: Array
    },
    resetSelector: {
      type: Boolean
    }
  },
  data() {
    return {
      room: ''
    };
  },
  methods: {
    selectedRoom() {
      let data = {
        id: this.room.id,
        name : this.room.name,
        filterApplied : true
      }
      this.$emit("filtered-room", data);
      console.log("filtered room data in filters", data);
      this.room = '';
    }
  }
};
</script>

<style scoped>

</style>