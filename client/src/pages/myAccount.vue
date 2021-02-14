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
    display: flex;
}

.panel div {
    text-align: center;
    width: 100%
}
.my-account * {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.my-account .section-header {
    margin-bottom: 25px;
}
.my-account .panel {
    min-height: 300px;
    width: 90%;
    margin: 0 auto;}
</style>