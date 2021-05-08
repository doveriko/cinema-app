import actions from './actions';
import getters from './getters';
import { seed } from './seeder';

export default {
    state() {
        return {
            rooms : seed.rooms,
            movies: seed.movies,
            sessions: seed.sessions
        };
    },
    actions,
    getters
};