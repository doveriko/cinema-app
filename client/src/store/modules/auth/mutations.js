export default {
    setUser(state, payload) {
        state.userId = payload.userId;
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        state.err = payload.err;
    }
}