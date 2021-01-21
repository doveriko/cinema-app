import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state() {
      return {
          userId: null,
          sessionId: null
      };
    },
    mutations,
    actions,
    getters
  };