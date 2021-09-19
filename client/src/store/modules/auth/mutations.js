export default {
    setUser(state, payload) {
        state.userId = payload.userId;
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        // state.err = payload.err;
    },
    authError(state, payload) {
        state.err = payload;
    },
    deleteUser(state, payload) {
        state.userId = payload.userId;
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        state.err = payload.err;
    },
    clearErrorMessage(state, payload) {
        state.err = payload
    },
    clearSession(state, payload) {
      state.name = payload.name,
      state.email = payload.email,
      state.token = payload.token,
      state.err = payload.err
    }
}