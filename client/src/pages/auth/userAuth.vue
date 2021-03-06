<template>
<div id="auth">
  <base-card :class="{ 'mobile' : isMobileMode }">
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
        <input type="password" id="password" v-model.trim="password"/>
      </div>
      <div v-if="selectedTab === 2" class="form-control">
        <label for="password">Repeat password</label>
        <input type="password" id="repeatPassword" v-model.trim="repeatPassword"/>
      </div>

      <div class="auth-errors">
        <p>{{emptyFieldsError}}</p>
        <p>{{authControllerError}}</p>
        <p v-if="selectedTab === 2">{{signupError}}</p>
      </div>

      <div class="button-wrapper">
        <button class="auth-button">{{buttonText}}</button>
      </div>
    </form>
  </base-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

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
      emptyFieldsError: null,
      viewMode: "login",
      selectedTab: 1,
    };
  },
  mounted() {
    this.loginError == "";
    this.signupError == "";
    this.$store.commit("clearErrorMessage", null)
  },
  updated() {
    if (this.email != '' && this.password != '') {
      this.emptyFieldsError = "";
    }
  },
  computed: {
    ...mapGetters([
      'isMobileMode'
    ]),
    login() {
      return "Log in";
    },
    signup() {
      return "Sign up";
    },
    authControllerError() {
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
    },
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
      this.emptyFieldsError = "";
      this.$store.commit("clearErrorMessage", null)
    },
    async submitForm() {
      this.$store.commit("clearErrorMessage", null)
      try {
        // Login
        if (this.viewMode === 'login') {
          if (this.email === '' || this.password === '') {
            this.formIsValid = false;
            this.emptyFieldsError = "All the fields need to be filled";
            this.$store.commit("clearErrorMessage", null)
          } else {
            await this.$store.dispatch("login", {
              email: this.email,
              password: this.password
            });
          }
        // Signup
        } else {
            this.formIsValid = true;
            if (this.name === '' || this.email === '' || this.password === '' || this.repeatPassword === '') {
              this.formIsValid = false;
              this.emptyFieldsError = "All the fields need to be filled";
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
        }
      } catch (err) {
          console.log(err);
      }
      this.redirectAfterAuth();
    },
    async redirectAfterAuth() {
      let orderStatus = this.$store.state.orders.orderStatus;
      console.log(this.authControllerError);
      if (typeof this.authControllerError != 'string' && this.emptyFieldsError != "All the fields need to be filled") {
        orderStatus == "pending" ? this.$router.replace('/checkout') : this.$router.replace('/my-account')
      }
    }
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
  margin-top: 1rem;
  display: block;
}

#auth input,
#auth textarea {
  display: block;
  width: 100%;
  border: none;
  padding: 0.15rem;
  height: 32px;
  border-bottom: 1px solid #ccc;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color:#f16b00;
  font-size: 11pt;
}

#auth input:focus,
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
  border-bottom: 1px solid #3a0061;
  flex-basis: 50%;
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 0.5rem;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 11pt;
}

.login-tab {
  border-right: 1px solid #3a0061;
}

.auth-panel .active {
    background: #3a0061;
    color: white;
}

.auth-panel div:hover {
  background: #3a00619c;
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

.auth-button, .accept-button {
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

.auth-button:hover, .accept-button:hover {
  background-color: #f16b00
}

#auth .button-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 2em 0;
}

.auth-errors {
  color: red;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 10pt;
}

#auth .card  {
  width: 40%;
}

#auth .card.mobile {
  width: 100%;
  padding: 0;
  box-shadow: none;
}

@media (min-width: 450px) and (max-width: 768px) {
  #auth .card.mobile {
    width: 60%
  }
}

#auth .card.mobile form {
  padding: 10px 0;
}
</style>