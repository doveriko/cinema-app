import mutations from './mutations.js';
import actions from './actions3.js';
import getters from './getters.js';

export default {
  state() {
    return {
      name: "",
      email: "",
      password: "",
      userId: null,
      token: null
    };
  },
  mutations,
  actions,
  getters
};