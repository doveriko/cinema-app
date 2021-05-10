export default {
    allMovies(state) {
        return state.movies;
    },
    oneMovie: (state) => (id) => {
        return state.movies.find(movie => movie.id === id);
    },
    allSessions(state) {
        return state.sessions;
    },
    allRooms(state) {
        return state.rooms;
    },
    allSeats(state) {
        return state.seats;
    }
}