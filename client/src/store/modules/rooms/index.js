import axios from 'axios';

export default {
    state() {
        return {
            rooms: [],
        };
    },
    actions: {
        async loadRooms(context) {
            let allRooms = []
            await axios
                .get(process.env.VUE_APP_API_URL + "/rooms")
                .then((response) => {
                allRooms = response.data;
                context.commit('loadRooms', allRooms)
                })
                .catch((err) => console.log(err));  
        }
    },
    mutations: {
        loadRooms(state, payload) {
            state.rooms = payload
        },
    },
    getters: {
        allRooms(state) {
            return state.rooms;
        },
        oneRoom: (state) => (id) => {
            return state.rooms.find(room => room.id == id);
        }
    }
};