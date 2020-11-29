import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.API_URL,
      withCredentials: true
    });
  }

  signup( context, payload ) {
    return this.auth
      .post("/users/signup", {
        name : payload.name,
        email: payload. email,
        password: payload.password
      })
      .then(({ data }) => data )
      .catch( err => console.log(err))
      // .then(
      //   context.commit('setUser', {
      //   token: data.token,
      //   userId: data.userId
      // }))
      // .catch( err => console.log(err))
  }

  login( username, password ) {
    return this.auth
      .post("/auth/login", { username, password })
      .then(({ data }) => { 
        return data
      })
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
    // return this.auth.get("/auth/me").then((response) => response.data);
  }
}

const authService = new Auth();
// `authService` is the object with the above axios request methods

export default authService;