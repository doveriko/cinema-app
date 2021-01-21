export default {
    setUser(state, payload) {
        state.name = payload.name;
        state.email = payload.email;
        state.password = payload.password;
    }
}