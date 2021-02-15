import axios from 'axios';

export default {
  async signup(context, payload) {
  
    let newUser = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };

    let { name, email, password } = newUser;

    await axios
      .post(process.env.VUE_APP_API_URL + "/users/signup",
        { name, email, password }
      )
      .then((response) => {
        if (response.data.err) {
          context.commit('authError', response.data.err);
        } else {
          newUser.token = response.data.token;
          newUser.userId = response.data.user.id;
          // newUser.msg = response.data.err;
          context.commit('setUser', newUser);
        }
      })
      .catch((err) => console.log(err));
  },

  async login(context, payload) {
    let registeredUser = {
      email: payload.email,
      password: payload.password,
    };

    let { email, password } = registeredUser;

    await axios
      .post(process.env.VUE_APP_API_URL + "/users/login",
        { email, password }
      )
      .then((response) => {
        if (response.data.err) {
          context.commit('authError', response.data.err);
        }
        else {
          // registeredUser.msg = response.data.err;
          registeredUser.userId = response.data.user.id;
          registeredUser.token = response.data.token;
          registeredUser.name = response.data.user.name;
          context.commit('setUser', registeredUser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteUser(context, data) {
    let userId = data;
    axios
    .delete(process.env.VUE_APP_API_URL + `/users/${userId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
    
    let resetAuthState = {
      userId : null,
      name : "",
      email : "",
      token : "",
      err : ""
    }
    context.commit('deleteUser', resetAuthState)
  }
}