<template>
  <base-card>
    <div v-if="orderStatus == 'pending'" class="complete-order-message">
      <p>Please, log in or sign up to complete your order</p>
    </div>
    <form @submit.prevent="submitForm">
      <div class="auth-panel" ref="auth">
        <div class="login-tab" :class="{active: selectedTab === 1}" @click="changeViewMode('login', 1)">
          {{ login }}
        </div>
        <div class="signup-tab" :class="{active: selectedTab === 2}" @click="changeViewMode('signup', 2)">
          {{ signup }}
        </div>
      </div>
      <div v-if="selectedTab === 2" class="form-control">
        <label for="name">Name</label>
        <input type="text" id="name" v-model.trim="name" />
      </div>
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <div v-if="selectedTab === 2" class="form-control">
        <label for="password">Repeat password</label>
        <input type="password" id="repeatPassword" v-model.trim="repeatPassword" />
      </div>
      <p v-if="!formIsValid && selectedTab === 2">{{signupError}}</p>
      <!-- <p v-if="selectedTab === 1">{{loginErrors}}</p> -->
      <p>{{loginErrors}}</p>
      <p>{{emptyLoginError}}</p>
      <button>{{buttonText}}</button>
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
      repeatPassword: "",
      formIsValid: true,
      loginError: "",
      signupError: "",
      emptyLoginError: "",
      viewMode: "login",
      selectedTab: 1,
    };
  },
  mounted() {
    this.loginError == "";
    this.signupError == "";
    this.$store.commit("clearErrorMessage", null)
    console.log("this.$route.query.redirect", this.$route.query.redirect);
    console.log("this.$route.query.fullPath", this.$route.query.fullPath);
    console.log("this.$route", this.$route);
  },
  updated() {
    if (this.email != '' && this.password != '') {
      this.emptyLoginError = "";
    }
  },
  computed: {
    login() {
      return "Log in";
    },
    signup() {
      return "Sign up";
    },
    loginErrors() {
      return this.$store.state.auth.err
    },
    buttonText(){
      if(this.viewMode === 'login') {
        return this.login
      } else {
        return this.signup
      }
    },
    orderStatus() {
      return this.$store.state.orders.orderStatus
    }
  },
  methods: {
    changeViewMode(view, tab = 0) {
      this.viewMode = view;
      if (tab > 0) this.selectedTab = tab;

      this.name = "";
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.signupError = "";
      this.emptyLoginError = "";
      this.$store.commit("clearErrorMessage", null)
    },
    async submitForm() {
      try {
        // Login
        if (this.viewMode === 'login') {
          if (this.email === '' || this.password === '') {
          this.formIsValid = false;
          this.emptyLoginError = "All the fields need to be filled";
          this.$store.commit("clearErrorMessage", null)
          } else {
            await this.$store.dispatch("login", {
              email: this.email,
              password: this.password
            });
            if (this.$store.getters.isAuthenticated)
            this.$router.replace(this.$route.query.redirect);
          }
        // Signup
        } else {
            this.formIsValid = true;
            if (this.name === '' || this.email === '' || this.password === '' || this.repeatPassword === '') {
              this.formIsValid = false;
              this.signupError = "All the fields need to be filled";
              return;
              } else if (this.name.length < 3 ) {
                this.formIsValid = false;
                this.signupError = "The name entered is too short";
              return;
              } else if (this.password.length < 6) {
                this.formIsValid = false;
                this.signupError = "The password must contain a minimum of 6 characters";
              return;
              } else if (this.password != this.repeatPassword) {
                this.formIsValid = false;
                this.signupError = "The passwords entered don't match. Please, try again";
              return;
            } else if (!this.email.includes('@')) {
                this.formIsValid = false;
                this.signupError = "Please enter a valid e-mail";
              return;
            } else if (this.password != this.repeatPassword) {
                this.formIsValid = false;
                this.signupError = "The passwords entered don't match. Please, try again";
              return;
            } 
            await this.$store.dispatch("signup", {
              name: this.name,
              email: this.email,
              password: this.password
            });
            if (this.$store.getters.isAuthenticated)
            this.$router.replace(this.$route.query.redirect);
        }
      } catch (err) {
          console.log(err);
      }
    },
  },
};
</script>

<style>
form {
  margin: 1rem;
  padding: 1rem;
}

form label {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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

.auth-panel {
  display: flex;
}

.login-tab,
.signup-tab {
  border-bottom: 1px solid #5151b1;
  flex-basis: 50%;
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 0.5rem;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 11pt;
}

.login-tab {
  border-right: 1px solid #5151b1;
}

.auth-panel div.active {
    background: #959eca;
}

.auth-panel div:hover {
  background: #4355a5;
  color: white;
}

.complete-order-message {
    border: 1px solid green;
    border-radius: 5px;
    padding: 0 2em;
    background: lightgreen;
    color: darkgreen;
    font-size: 10pt;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: center;
    margin: 0 2em;
}

.auth-buttons {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

#auth .button-wrapper {
    display: flex;
    justify-content: flex-end;
}

.error {
  color: red;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

</style>