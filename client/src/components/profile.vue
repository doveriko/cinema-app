<template>
  <div id="profile">
    <div class="user-info">
      <h3>PROFILE</h3>
      <p>{{ name }}</p>
      <p>{{ email }}</p>
    </div>
    <div v-if="this.deletionIsActive">
      <p>Are you sure you want to delete your account?</p>
      <button @click.prevent="deleteAccount">YES</button>
      <button @click.prevent="deletionIsActive = false">NO</button>
    </div>
    <div class="user-actions">
      <a href="">Change password</a> | <a href="" @click.prevent="activateDeletion">Delete account</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletionIsActive: false
    };
  },
  computed: {
    name() {
      return this.$store.state.auth.name;
    },
    email() {
      return this.$store.state.auth.email;
    },
  },
  methods: {
    activateDeletion() {
      this.deletionIsActive = true;
    },
    deleteAccount() {
      let userId = this.$store.getters.userId;
      this.$store.dispatch("deleteUser", userId);
      this.deletionIsActive = false;
      this.$router.replace("/auth");
    }
  },
};
</script>

<style>
div#profile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 0;
}
.user-actions {
    padding-bottom: 10px;
}
</style>