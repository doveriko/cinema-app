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
      .post("http://localhost:3000" + "/users/signup",
        { name, email, password },
        { withCredentials: false }
      )
      .then((response) => {
        newUser.userId = response.data.user.id;
        newUser.token = response.data.token;
        newUser.err = response.data.err;
      })
      .catch((err) => console.log(err));

    context.commit('setUser', newUser);
  },

  async login(context, payload) {
    let registeredUser = {
      email: payload.email,
      password: payload.password,
    };

    let { email, password } = registeredUser;

    await axios
      .post("http://localhost:3000" + "/users/login",
        { email, password },
        { withCredentials: false }
      )
      .then((response) => {
        if (response.data.err) {
          console.log("response.data.err", response.data.err)
          registeredUser.err = response.data.err;
        }
        else {
          registeredUser.msg = response.data.err;
          registeredUser.userId = response.data.user.id;
          registeredUser.token = response.data.token;
          registeredUser.name = response.data.user.name;
        }
      })
      .catch((err) => {
        console.log("TONI LO SABE", err);
      });

    context.commit('setUser', registeredUser);
  }
}