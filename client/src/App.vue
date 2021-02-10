<template>
  <div>
    <app-navbar></app-navbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import navbar from './components/layout/navbar.vue';

export default {
    components: {
      'app-navbar' : navbar
    }
}
</script>

<style>
</style>
