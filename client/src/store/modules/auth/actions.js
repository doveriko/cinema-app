import axios from 'axios';

export default {
  async signup(context, payload) {
  
    let newUser = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };

    let { name, email, password } = newUser;
    let router = payload.router;
    
    await axios
      .post(process.env.VUE_APP_API_URL + "/users/signup",
        { name, email, password },
      )
      .then((response) => {
        if (response.data.err) {
          newUser.err = response.data.err;
        } else {
          newUser.token = response.data.token;
          newUser.msg = response.data.err;

          router.push('/movies')
        }
      })
      .catch((err) => console.log(err));

    context.commit('setUser', newUser);
  },

  async login(context, payload) {
    let registeredUser = {
      email: payload.email,
      password: payload.password,
    };

    let router = payload.router;

    let { email, password } = registeredUser;

    await axios
      .post(process.env.VUE_APP_API_URL + "/users/login",
        { email, password }
      )
      .then((response) => {
        if (response.data.err) {
          registeredUser.err = response.data.err;
        }
        else {
          registeredUser.msg = response.data.err;
          registeredUser.userId = response.data.user.id;
          registeredUser.token = response.data.token;
          registeredUser.name = response.data.user.name;

          router.push('/movies')
        }
      })
      .catch((err) => {
        console.log(err);
      });

    context.commit('setUser', registeredUser);
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
  },
}