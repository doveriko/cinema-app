export default {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    userName(state) {
      return state.name;
    },
    email(state) {
      return state.email;
    },
    authError(state) {
      return state.err;
    }
  };