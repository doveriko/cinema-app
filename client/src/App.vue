<template>
  <div>
    <app-navbar></app-navbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import navbar from './components/navbar.vue';


export default {
    data () {
        return {

        }
    },
    components: {
      'app-navbar' : navbar
    },
    methods: {

    }
}
</script>

<style>

</style>
