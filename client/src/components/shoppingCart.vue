<template>
 <div id="shopping-cart">
    <ul v-for="(ticket, i) in tickets" :key="i">
      <li>{{ticket.area}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['tickets']
};
</script>

<style>

</style>