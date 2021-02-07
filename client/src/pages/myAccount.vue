<template>
  <div class="my-account">
      <div class="panel">
            <profile></profile>
            <bookings></bookings>     
      </div>
  </div>
</template>

<script>
import profile from '../components/profile';
import bookings from '../components/bookings';

export default {
    components: {
        profile,
        bookings
    }
}
</script>

<style>
.my-account .panel {
    border: 3px solid grey;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    width: 100%
}

.panel div {
    text-align: center;
    width: 100%
}
</style>