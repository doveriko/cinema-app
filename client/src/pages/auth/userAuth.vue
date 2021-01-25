<template>
  <base-card>
    <!-- <form @submit.prevent="submitForm"> -->
    <form @submit.prevent="logueao">
      <!-- <div class="form-control">
        <label for="name">Name</label>
        <input type="text" id="name" v-model.trim="name" />
      </div> -->
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <!-- <p v-if="!formIsValid">
        Please enter a valid email and password (must be at least 6 characters
        long).
      </p> -->
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchModeButtonCaption
      }}</base-button>
      <p :show="errorMessage">{{ errorMessage }}</p>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      error: "",
    };
  },
  computed: {
    errorMessage() {
      return this.$store.state.auth.err;
    },
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    submitForm() {
      // this.formIsValid = true;
      // if (
      //   this.email === "" ||
      //   !this.email.includes("@") ||
      //   this.password.length < 6
      // ) {
      //   this.formIsValid = false;
      //   return;
      // }

      // if (this.mode === "login") {
      //   // ...
      // } else {

      try {
        this.$store.dispatch("signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        // const redirectUrl = "/" + (this.$route.query.redirect || "movies");
        // this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }
      // }
    },
    logueao() {
      try {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        // const redirectUrl = "/" + (this.$route.query.redirect || "movies");
        // this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode === "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>