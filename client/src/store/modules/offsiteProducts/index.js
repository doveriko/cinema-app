import axios from 'axios';

export default {
    state() {
        return {
            offsiteProducts: [],
        };
    },
    actions: {
        async loadOffsiteProducts(context) {
            let allOffsiteProducts = []
            await axios
                .get(process.env.VUE_APP_API_URL + "/offsiteproducts")
                .then((response) => {
                    allOffsiteProducts = response.data
                })
                .catch((err) => console.log(err));
                context.commit('loadOffsiteProducts', allOffsiteProducts)
        }
    },
    mutations: {
        loadOffsiteProducts(state, payload) {
            state.offsiteProducts = payload
        },
    },
    getters: {
        allOffsiteProducts(state) {
            return state.offsiteProducts;
        }
    }
};