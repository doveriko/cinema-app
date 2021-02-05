<template>
    <div>
        <p>BOOKINGS</p>
        <li v-for="order in allOrders" :key="order.id">
          {{order.sessionId}}
        </li>
  </div>
</template>

<script>
export default {
  created() {
    this.loadOrders();
    console.log(this.allOrders);
    
  },
  methods: {
    loadOrders() {
      this.$store.dispatch('loadOrders');
    }
  },
  computed: {
    allOrders() {
      return this.$store.getters.allOrders;
    }
  },
}
</script>

<style>

</style>