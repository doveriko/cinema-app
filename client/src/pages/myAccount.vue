<template>
  <div id="my-account">
    <div class="panel">
      <profile></profile>
      <bookings></bookings>
    </div>
  </div>
</template>

<script>
import profile from "../components/profile";
import bookings from "../components/bookings";

export default {
  components: {
    profile,
    bookings,
  },
};
</script>

<style lang="scss">
.mobile {
  #my-account {
    .panel  {
      flex-direction: column-reverse;
      .user-actions {
        padding-top: 2rem;
      }
      #bookings {
          padding: 0
      }
    }
  } 
}

#my-account {
  * {
    font-family: $base-font-family;
  }
  .panel {
    display: flex;
    min-height: 300px;
    width: 90%;
    margin: 0 auto;

    div {
      text-align: center;
      width: 100%;
    }
  }
  .section-header {
    margin-bottom: 25px;
  }
} 
</style>