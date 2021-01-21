import axios from 'axios';

export default {
    async signup(context, payload) {
        let newUser = {
        
          name: payload.name,
          email: payload.email,
          password: payload.password
        };

        let { name, email, password } = newUser;
      
        axios
        .post("http://localhost:3000" + "/users/signup",
        { name, email, password },
        { withCredentials: false }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    
        context.commit('setUser', newUser);
      }
}