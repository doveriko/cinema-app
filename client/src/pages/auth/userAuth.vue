<template>
<div id="auth">
  <base-card>

    <form @submit.prevent="submitForm">
      <div class="auth-panel" ref="auth">
        <div class="login-tab" :class="{active: selectedTab === 1}" @click="changeViewMode('login', 1)">
          <span v-html="loginLabel"></span>
        </div>
        <div class="signup-tab" :class="{active: selectedTab === 2}" @click="changeViewMode('signup', 2)">
          <span v-html="signupLabel"></span>
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
import { mapActions } from "vuex";

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
    loginLabel() {
      return "Log in";
    },
    signupLabel() {
      return "Sign up";
    },
    authControllerError() {
      return this.$store.state.auth.err
    },
    buttonText(){
      if(this.viewMode === 'login') {
        return this.loginLabel
      } else {
        return this.signupLabel
      }
    },
    orderStatus() {
      return this.$store.state.orders.orderStatus
    },
  },
  methods: {
    ...mapActions(['login', 'signup']),
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
            await this.login({
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
            await this.signup({
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
      if (typeof this.authControllerError != 'string' && this.emptyFieldsError != "All the fields need to be filled") {
        if (orderStatus != "pending") this.$router.replace('/my-account')
        else if (orderStatus == "pending" && this.$route.path == "/auth") this.$router.go(-1)
      }
    }
  },
};
</script>

<style lang="scss">
form {
  margin: 1rem;
  padding: 1rem;
}

form label {
    font-family: $base-font-family;
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
  font-family: $base-font-family;
  color:$base-secondary-color;
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
  border-bottom: 1px solid $base-color;
  flex-basis: 50%;
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 0.5rem;
  font-family: $base-font-family;
  font-size: 11pt;
}

.login-tab {
  border-right: 1px solid $base-color;
}

.auth-panel .active {
    background: $base-color;
    color: white;
}

.auth-panel div:hover {
  background: $base-color;
  color: white;
}

.complete-order-message {
    border: 1px solid green;
    border-radius: 5px;
    padding: 0 2em;
    background: lightgreen;
    color: darkgreen;
    font-size: 10pt;
    font-family: $base-font-family;
    text-align: center;
    margin: 0 2em;
}

.auth-button, .accept-button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: $base-color;
  border: 1px solid $base-color;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  font-family: $base-font-family;

  &:hover {
    background-color: $base-secondary-color;
  }
}

#auth .button-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 2em 0;
}

.auth-errors {
  color: red;
  font-family: $base-font-family;
  font-size: 10pt;
}

#auth .card  {
  width: 40%;
}

.mobile #auth .card {
  width: 100%;
  padding: 0;
  box-shadow: none;

  @media (min-width: 450px) and (max-width: 768px) {
    width: 60%;
  }

  form {
    padding: 10px 0;
  }
}

#checkout #auth {
    width: 350px;
}
</style>