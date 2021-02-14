<template>
  <div id="profile">
    <div class="user-info">
      <h1 class="section-header">PROFILE</h1>
      <p class="user-name">{{ name }}</p>
      <p class="user-email">{{ email }}</p>
    </div>
    <div v-if="this.deletionIsActive" class="delete-order">
      <p>Are you sure you want to delete your account?</p>
      <span @click.prevent="deletionIsActive = false"><font-awesome-icon icon="times"/></span>
      <span @click.prevent="deleteAccount"><font-awesome-icon icon="check"/></span>
    </div>
    <div class="user-actions">
      <a href="" @click.prevent="activateDeletion" v-if="!this.deletionIsActive">Delete account</a>
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
.user-name {
  font-weight: bold;
}
</style>