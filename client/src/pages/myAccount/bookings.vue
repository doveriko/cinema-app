<template>
    <div>
        <p>BOOKINGS</p>
  </div>
</template>

<script>
export default {
  created() {
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      this.$store.dispatch('loadOrders');
    },
  }
}
</script>

<style>

</style>