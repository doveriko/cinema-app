<template>
  <div>
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import header from './components/header.vue';


export default {
    data () {
        return {

        }
    },
    components: {
      'app-header' : header
    },
    methods: {

    }
}
</script>

<style>

</style>
