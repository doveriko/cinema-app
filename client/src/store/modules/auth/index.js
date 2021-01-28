import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      name: "",
      email: "",
      token: "",
      err: ""
    };
  },
  mutations,
  actions,
  getters
};