<template>
  <div class="my-account">
      <h1>MY ACCOUNT</h1>
      <div class="panel">
          <div>
            <profile></profile>
          </div>
          <div>
            <bookings></bookings>
          </div>        
      </div>
  </div>
</template>

<script>
import profile from './profile';
import bookings from './bookings';

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