import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { seed } from './seeder';

export default {
    state() {
        return {
            rooms : seed.rooms,
            movies: seed.movies,
            sessions: seed.sessions,
            seats: seed.seats,
            selectedMovie: {}
        };
    },
    actions,
    mutations,
    getters
};